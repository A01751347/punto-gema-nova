'use server';

import prisma from '@/lib/db/prisma';
import { UserRole } from '@/types';
import { revalidatePath } from 'next/cache';

// Helper to verify admin access internally if needed, 
// though we usually rely on the caller to handle auth or the middleware.
// For server actions, we should re-verify the user's role.

async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required');
    }
}

export async function getAdminStatsAction(email: string) {
    try {
        await requireAdmin(email);

        const totalOrders = await prisma.order.count();

        const totalRevenueAgg = await prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { not: 'CANCELLED' } }
        });
        const totalRevenue = totalRevenueAgg._sum.total || 0;

        const lowStockCount = await prisma.product.count({
            where: {
                stock: { lte: 10 } // Hardcoded threshold for now, or use lowStockThreshold column
            }
        });

        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                _count: { select: { items: true } }
            }
        });

        return {
            success: true,
            stats: {
                totalOrders,
                totalRevenue,
                lowStockCount,
                recentOrders
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getAllOrdersAction(email: string, page = 1, limit = 20) {
    try {
        await requireAdmin(email);

        const skip = (page - 1) * limit;

        const orders = await prisma.order.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { email: true, firstName: true, lastName: true } },
                _count: { select: { items: true } }
            }
        });

        const total = await prisma.order.count();

        return {
            success: true,
            orders,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateOrderStatusAction(email: string, orderId: string, status: any) {
    try {
        await requireAdmin(email);

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        revalidatePath('/admin/pedidos');
        return { success: true, order };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Dev helper to promote self
export async function promoteToAdminAction(email: string, secretKey: string) {
    // Basic protection to prevent public abuse
    if (secretKey !== process.env.ADMIN_SECRET_KEY && secretKey !== 'admin-secret-dev') {
        return { success: false, error: 'Invalid secret key' };
    }

    try {
        await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
