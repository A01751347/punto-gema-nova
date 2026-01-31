'use server';

import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
        throw new Error('Unauthorized: Admin access required');
    }
}

export async function updateOrderTrackingAction(email: string, orderId: string, trackingNumber: string, shippingMethod?: string) {
    try {
        await requireAdmin(email);

        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                trackingNumber,
                shippingMethod,
                // Auto-update status to SHIPPED if adding tracking number and currently PENDING/CONFIRMED/PROCESSING
                status: 'SHIPPED'
            }
        });

        revalidatePath(`/admin/pedidos/${orderId}`);
        return { success: true, order };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
