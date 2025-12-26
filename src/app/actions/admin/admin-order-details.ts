'use server';

import prisma from '@/lib/db/prisma';

// Helper to verify admin access
async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required');
    }
}

export async function getAdminOrderDetailsAction(adminEmail: string, orderId: string) {
    try {
        await requireAdmin(adminEmail);

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                slug: true,
                                images: true
                            }
                        }
                    }
                },
                shippingAddress: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        if (!order) {
            return { success: false, error: 'Pedido no encontrado' };
        }

        return { success: true, order };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
