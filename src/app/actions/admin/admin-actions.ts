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

export async function getAdminStatsAction(email: string, timeRange: string = '1m') {
    try {
        await requireAdmin(email);

        const now = new Date();
        const startDate = new Date();
        const prevStartDate = new Date();
        const prevEndDate = new Date();

        let periodLabel = 'mes anterior';

        switch (timeRange) {
            case '3m':
                startDate.setMonth(now.getMonth() - 3);
                prevStartDate.setMonth(now.getMonth() - 6);
                prevEndDate.setMonth(now.getMonth() - 3);
                periodLabel = '3 meses anteriores';
                break;
            case '6m':
                startDate.setMonth(now.getMonth() - 6);
                prevStartDate.setMonth(now.getMonth() - 12);
                prevEndDate.setMonth(now.getMonth() - 6);
                periodLabel = '6 meses anteriores';
                break;
            case '1y':
                startDate.setFullYear(now.getFullYear() - 1);
                prevStartDate.setFullYear(now.getFullYear() - 2);
                prevEndDate.setFullYear(now.getFullYear() - 1);
                periodLabel = 'año anterior';
                break;
            case 'all':
                startDate.setFullYear(2000); // effectively all time
                prevStartDate.setFullYear(1900);
                prevEndDate.setFullYear(2000);
                periodLabel = 'periodo anterior';
                break;
            case '1m':
            default:
                startDate.setMonth(now.getMonth() - 1);
                prevStartDate.setMonth(now.getMonth() - 2);
                prevEndDate.setMonth(now.getMonth() - 1);
                periodLabel = 'mes anterior';
                break;
        }

        // Helper function to get stats for a date range
        const getPeriodStats = async (start: Date, end: Date) => {
            const orders = await prisma.order.count({
                where: { createdAt: { gte: start, lte: end } }
            });

            const revAgg = await prisma.order.aggregate({
                _sum: { total: true },
                where: {
                    createdAt: { gte: start, lte: end },
                    status: { not: 'CANCELLED' },
                    paymentStatus: 'COMPLETED'
                }
            });

            const customers = await prisma.user.count({
                where: {
                    createdAt: { gte: start, lte: end },
                    role: 'CUSTOMER'
                }
            });

            return {
                orders,
                revenue: revAgg._sum.total || 0,
                customers
            };
        };

        const current = await getPeriodStats(startDate, now);
        const prev = await getPeriodStats(prevStartDate, prevEndDate);

        // Calculate trends
        const calcTrend = (curr: number, prior: number, isCurrency: boolean = false) => {
            if (timeRange === 'all') return null; // No trend for "all time"

            if (prior === 0) {
                if (curr === 0) return `Sin cambios`;

                const formattedCurr = new Intl.NumberFormat('es-MX', {
                    style: isCurrency ? 'currency' : 'decimal',
                    currency: isCurrency ? 'MXN' : undefined,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                }).format(curr);

                return `+${formattedCurr}`;
            }
            const diff = curr - prior;
            const percent = ((diff) / prior) * 100;
            const sign = diff >= 0 ? '+' : '';
            return `${sign}${percent.toFixed(1)}% vs ${periodLabel}`;
        };

        // Current totals (since start) - Note: average usually is of all time or period?
        const totalCustomersRaw = await prisma.user.count({ where: { role: 'CUSTOMER' } }); // total lifetime
        const currentCustomersTrend = calcTrend(current.customers, prev.customers);

        const totalOrders = current.orders;
        const totalRevenue = current.revenue;
        const totalCustomers = current.customers; // or totalCustomersRaw if you want overall lifetime
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        const prevAvg = prev.orders > 0 ? prev.revenue / prev.orders : 0;

        const trends = {
            revenue: calcTrend(totalRevenue, prev.revenue, true),
            orders: calcTrend(totalOrders, prev.orders),
            customers: currentCustomersTrend,
            avg: calcTrend(avgOrderValue, prevAvg)
        };

        const lowStockCount = await prisma.product.count({
            where: { stock: { lte: 5 } }
        });

        // 2. Sales Over Time (Last X Days - only up to 30 points max for graph to not crush the UI)
        let graphStartDate = startDate;
        if (timeRange === 'all' || timeRange === '1y' || timeRange === '6m') {
            // Cap visual graph to 30 sections (or just keep last 30 days for visual simplicity, but we will aggregate to 30 points if required. For now let's just use last 30 days to avoid too complex logic on the client visually if they selected a huge range)
            // Or better, let's keep showing the selected range but bucketed? 
            // Simple approach: show 30 days always for the graph unless it's a small period. 
            // Let's adjust graph startDate to max 30 days ago to not break Recharts with 365 labels.
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            if (startDate < thirtyDaysAgo) {
                graphStartDate = thirtyDaysAgo;
            }
        }

        const recentSales = await prisma.order.findMany({
            where: {
                createdAt: { gte: graphStartDate },
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
            const currentTotal = salesMap.get(day) || 0;
            salesMap.set(day, currentTotal + order.total);
        });

        const salesGraph = [];
        const diffDays = Math.ceil((now.getTime() - graphStartDate.getTime()) / (1000 * 60 * 60 * 24));
        for (let i = diffDays - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const label = d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
            salesGraph.push({
                name: label,
                ventas: salesMap.get(label) || 0
            });
        }

        // 3. Top Products (Within the range)
        const topProductsRaw = await prisma.orderItem.groupBy({
            by: ['name'],
            _sum: { quantity: true },
            where: {
                order: { createdAt: { gte: startDate } }
            },
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
                totalCustomers, // Active in period
                totalLifetimeCustomers: totalCustomersRaw, // Useful if you want the total count instead
                avgOrderValue,
                trends,
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
