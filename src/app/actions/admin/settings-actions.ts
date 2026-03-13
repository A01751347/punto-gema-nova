'use server';

import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export async function getStoreSettingsAction() {
    try {
        let settings = await prisma.storeSettings.findUnique({
            where: { id: 'default' }
        });

        // If settings don't exist yet, create them with defaults
        if (!settings) {
            settings = await prisma.storeSettings.create({
                data: {
                    id: 'default',
                    orderNotificationEmails: [],
                    invoiceNotificationEmails: []
                }
            });
        }

        return { success: true, settings };
    } catch (error: any) {
        console.error('Error fetching settings:', error);
        return { success: false, error: 'No se pudieron cargar las configuraciones.' };
    }
}

export async function updateStoreSettingsAction(data: {
    orderNotificationEmails: string[];
    invoiceNotificationEmails: string[];
}) {
    try {
        const settings = await prisma.storeSettings.upsert({
            where: { id: 'default' },
            create: {
                id: 'default',
                orderNotificationEmails: data.orderNotificationEmails,
                invoiceNotificationEmails: data.invoiceNotificationEmails
            },
            update: {
                orderNotificationEmails: data.orderNotificationEmails,
                invoiceNotificationEmails: data.invoiceNotificationEmails
            }
        });

        revalidatePath('/admin/configuracion');

        return { success: true, message: 'Configuraciones actualizadas correctamente' };
    } catch (error: any) {
        console.error('Error updating settings:', error);
        return { success: false, error: 'Hubo un error al actualizar la configuración.' };
    }
}
