'use server';

import prisma from '@/lib/db/prisma';

// Helper to check admin
async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({ where: { email }, select: { role: true } });
    if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
}

export async function getCustomerOrderHistoryAction(adminEmail: string, customerId: string) {
    try {
        await requireAdmin(adminEmail);

        const orders = await prisma.order.findMany({
            where: { userId: customerId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { items: true } }
            }
        });

        return { success: true, orders };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
