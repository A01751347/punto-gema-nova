'use server';

import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export interface AddressData {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}

export async function getUserAddressesAction(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) return { success: false, error: 'User not found' };

        const addresses = await prisma.address.findMany({
            where: { userId: user.id },
            orderBy: { isDefault: 'desc' } // Default first
        });

        return { success: true, addresses };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getAddressAction(email: string, addressId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) return { success: false, error: 'User not found' };

        const address = await prisma.address.findUnique({
            where: { id: addressId }
        });

        if (!address || address.userId !== user.id) {
            return { success: false, error: 'Address not found' };
        }

        return { success: true, address };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createAddressAction(email: string, data: AddressData) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) return { success: false, error: 'User not found' };

        // If this is the first address or marked default, we might need to handle other defaults
        if (data.isDefault) {
            await prisma.address.updateMany({
                where: { userId: user.id },
                data: { isDefault: false }
            });
        }

        // If no addresses exist, force this one to be default
        const count = await prisma.address.count({ where: { userId: user.id } });
        const isDefault = data.isDefault || count === 0;

        const address = await prisma.address.create({
            data: {
                userId: user.id,
                ...data,
                isDefault
            }
        });

        revalidatePath('/cuenta/direcciones');
        return { success: true, address };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateAddressAction(email: string, addressId: string, data: AddressData) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) return { success: false, error: 'User not found' };

        // Verify ownership
        const existing = await prisma.address.findUnique({
            where: { id: addressId }
        });

        if (!existing || existing.userId !== user.id) {
            return { success: false, error: 'Address not found or unauthorized' };
        }

        if (data.isDefault) {
            await prisma.address.updateMany({
                where: { userId: user.id },
                data: { isDefault: false }
            });
        }

        const address = await prisma.address.update({
            where: { id: addressId },
            data: {
                ...data,
                isDefault: data.isDefault
            }
        });

        revalidatePath('/cuenta/direcciones');
        return { success: true, address };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteAddressAction(email: string, addressId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) return { success: false, error: 'User not found' };

        const existing = await prisma.address.findUnique({
            where: { id: addressId }
        });

        if (!existing || existing.userId !== user.id) {
            return { success: false, error: 'Unauthorized' };
        }

        await prisma.address.delete({
            where: { id: addressId }
        });

        revalidatePath('/cuenta/direcciones');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function setDefaultAddressAction(email: string, addressId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) return { success: false, error: 'User not found' };

        // Reset others
        await prisma.address.updateMany({
            where: { userId: user.id },
            data: { isDefault: false }
        });

        // Set new default
        await prisma.address.update({
            where: { id: addressId, userId: user.id },
            data: { isDefault: true }
        });

        revalidatePath('/cuenta/direcciones');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
