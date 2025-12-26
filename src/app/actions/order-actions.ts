'use server';

import prisma from '@/lib/db/prisma';

export async function getUserOrdersAction(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        const orders = await prisma.order.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    take: 1, // Only get first item for preview
                    select: { name: true }
                }
            }
        });

        return { success: true, orders };
    } catch (error: any) {
        console.error('Get user orders error:', error);
        return { success: false, error: error.message };
    }
}

export async function getOrderDetailsAction(orderId: string, email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                images: true,
                                slug: true
                            }
                        }
                    }
                },
                shippingAddress: true
            }
        });

        if (!order) {
            return { success: false, error: 'Order not found' };
        }

        // Security check: ensure order belongs to user
        if (order.userId !== user.id) {
            return { success: false, error: 'Unauthorized' };
        }

        return { success: true, order };
    } catch (error: any) {
        console.error('Get order details error:', error);
        return { success: false, error: error.message };
    }
}
