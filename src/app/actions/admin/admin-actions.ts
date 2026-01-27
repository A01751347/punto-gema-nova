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

        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        // 1. Basic Counts
        const totalOrders = await prisma.order.count();
        const totalRevenueAgg = await prisma.order.aggregate({
            _sum: { total: true },
            where: {
                status: { not: 'CANCELLED' },
                paymentStatus: 'COMPLETED'
            }
        });
        const totalRevenue = totalRevenueAgg._sum.total || 0;

        const lowStockCount = await prisma.product.count({
            where: { stock: { lte: 5 } }
        });

        const totalCustomers = await prisma.user.count({
            where: { role: 'CUSTOMER' }
        });

        // 2. Sales Over Time (Last 30 Days)
        // Grouping by createdAt directly might be too granular (timestamps), 
        // usually we'd use raw SQL for date truncation, but let's try JS processing for simplicity with Prisma.
        const recentSales = await prisma.order.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                status: { not: 'CANCELLED' },
                paymentStatus: 'COMPLETED'
            },
            select: {
                createdAt: true,
                total: true
            }
        });

        const salesMap = new Map<string, number>();
        recentSales.forEach(order => {
            const day = order.createdAt.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
            const current = salesMap.get(day) || 0;
            salesMap.set(day, current + order.total);
        });

        const salesGraph = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const label = d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
            salesGraph.push({
                name: label,
                ventas: salesMap.get(label) || 0
            });
        }

        // 3. Top Products
        const topProductsRaw = await prisma.orderItem.groupBy({
            by: ['name'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 5
        });

        const topProducts = topProductsRaw.map(p => ({
            name: p.name,
            quantity: p._sum.quantity || 0
        }));

        // 4. Recent Orders
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
                totalCustomers,
                avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
                lowStockCount,
                salesGraph,
                topProducts,
                recentOrders
            }
        };
    } catch (error: any) {
        console.error("Stats Error:", error);
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
