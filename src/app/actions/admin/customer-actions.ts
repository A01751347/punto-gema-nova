'use server';

import prisma from '@/lib/db/prisma';

// Helper to check admin
async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({ where: { email }, select: { role: true } });
    if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
}

export async function getAdminCustomersAction(email: string) {
    try {
        await requireAdmin(email);

        const customers = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { orders: true }
                }
            }
        });

        return { success: true, customers };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
