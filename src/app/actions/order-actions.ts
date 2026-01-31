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
                    select: {
                        name: true,
                        quantity: true,
                        product: {
                            select: {
                                images: true
                            }
                        }
                    }
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

export async function trackOrderAction(orderNumber: string, email: string) {
    try {
        // Try to find by direct orderNumber
        const order = await prisma.order.findUnique({
            where: { orderNumber },
            include: {
                // Include minimal details for security if needed, or full if verified
                shippingAddress: true,
                items: {
                    select: {
                        name: true,
                        quantity: true,
                        price: true,
                        product: {
                            select: { images: true }
                        }
                    }
                },
                user: {
                    select: { email: true }
                }
            }
        });

        if (!order) {
            return { success: false, error: 'No encontramos una orden con este número.' };
        }

        // Verify email matches either the registered user or the guest email
        const orderEmail = order.user?.email || order.guestEmail;

        // Simple case-insensitive match
        if (!orderEmail || orderEmail.toLowerCase() !== email.toLowerCase()) {
            return { success: false, error: 'El correo electrónico no coincide con el de la orden.' };
        }

        return { success: true, order };

    } catch (error: any) {
        console.error('Tracking error:', error);
        return { success: false, error: 'Error al buscar la orden. Intente más tarde.' };
    }
}
