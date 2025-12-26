'use server';

import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({ where: { email }, select: { role: true } });
    if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
}

export async function getAdminCouponsAction(email: string) {
    try {
        await requireAdmin(email);
        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, coupons };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createCouponAction(email: string, data: any) {
    try {
        await requireAdmin(email);

        const coupon = await prisma.coupon.create({
            data: {
                code: data.code.toUpperCase(),
                discountType: data.discountType,
                discountValue: parseFloat(data.discountValue),
                minPurchase: data.minPurchase ? parseFloat(data.minPurchase) : null,
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
                isActive: true
            }
        });

        revalidatePath('/admin/cupones');
        return { success: true, coupon };
    } catch (error: any) {
        // Handle unique constraint violation
        if (error.code === 'P2002') {
            return { success: false, error: 'Codigo de cupón ya existe.' };
        }
        return { success: false, error: error.message };
    }
}

export async function deleteCouponAction(email: string, id: string) {
    try {
        await requireAdmin(email);
        await prisma.coupon.delete({ where: { id } });
        revalidatePath('/admin/cupones');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
