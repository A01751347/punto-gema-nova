import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './cognito';
import { UserRole } from '@/types';

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        cognitoId: string;
        email: string;
        role: UserRole;
    };
}

/**
 * Middleware to verify authentication
 */
export async function requireAuth(request: NextRequest): Promise<{
    authorized: boolean;
    user?: { cognitoId: string; email: string; role: UserRole };
    error?: string;
}> {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { authorized: false, error: 'No authorization token provided' };
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        const cognitoUser = await getUser(token);

        // Fetch user from database to get role
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/by-cognito/${cognitoUser.sub}`, {
            headers: {
                'x-internal-request': 'true',
            },
        });

        if (!response.ok) {
            return { authorized: false, error: 'User not found in database' };
        }

        const dbUser = await response.json();

        return {
            authorized: true,
            user: {
                cognitoId: cognitoUser.sub,
                email: cognitoUser.email,
                role: dbUser.role,
            },
        };
    } catch (error: any) {
        console.error('Auth middleware error:', error);
        return { authorized: false, error: error.message || 'Authentication failed' };
    }
}

/**
 * Middleware to verify admin role
 */
export async function requireAdmin(request: NextRequest): Promise<{
    authorized: boolean;
    user?: { cognitoId: string; email: string; role: UserRole };
    error?: string;
}> {
    const authResult = await requireAuth(request);

    if (!authResult.authorized) {
        return authResult;
    }

    if (authResult.user?.role !== UserRole.ADMIN) {
        return { authorized: false, error: 'Admin access required' };
    }

    return authResult;
}

/**
 * Helper to create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
    return NextResponse.json(
        { success: false, error: message },
        { status: 401 }
    );
}

/**
 * Helper to create forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden') {
    return NextResponse.json(
        { success: false, error: message },
        { status: 403 }
    );
}
