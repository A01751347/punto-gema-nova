'use server';

import {
    signIn as cognitoSignIn,
    signUp as cognitoSignUp,
    confirmSignUp as cognitoConfirmSignUp,
    getUser as cognitoGetUser,
    forgotPassword as cognitoForgotPassword,
    confirmForgotPassword as cognitoConfirmForgotPassword
} from '@/lib/auth/cognito';

import prisma from '@/lib/db/prisma';

export async function loginAction(email: string, password: string) {
    try {
        const tokens = await cognitoSignIn(email, password);
        // Return serializable data
        return { success: true, tokens };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function registerAction(email: string, password: string, attributes?: Record<string, string>) {
    try {
        const result = await cognitoSignUp(email, password, attributes);

        // Create user in Prisma to keep them in sync
        if (result.userSub) {
            await prisma.user.upsert({
                where: { email },
                update: {
                    cognitoId: result.userSub,
                    firstName: attributes?.given_name,
                    lastName: attributes?.family_name,
                },
                create: {
                    email,
                    cognitoId: result.userSub,
                    firstName: attributes?.given_name,
                    lastName: attributes?.family_name,
                    role: 'CUSTOMER'
                }
            });
        }

        return { success: true, result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function confirmSignUpAction(email: string, code: string) {
    try {
        await cognitoConfirmSignUp(email, code);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function forgotPasswordAction(email: string) {
    try {
        await cognitoForgotPassword(email);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function confirmForgotPasswordAction(email: string, code: string, newPassword: string) {
    try {
        await cognitoConfirmForgotPassword(email, code, newPassword);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getUserAction(accessToken: string) {
    try {
        const user = await cognitoGetUser(accessToken);
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getUserDbAction(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) return { success: false, error: 'User not found' };
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUserAction(email: string, data: { firstName: string; lastName: string }) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
            }
        });
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
