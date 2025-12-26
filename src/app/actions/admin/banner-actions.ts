'use server';

import prisma from '@/lib/db/prisma';
import { uploadFile, deleteFile, extractKeyFromUrl } from '@/lib/storage/s3';
import { revalidatePath } from 'next/cache';

async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({ where: { email }, select: { role: true } });
    if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
}

export async function getAdminBannersAction(email: string) {
    try {
        await requireAdmin(email);
        const banners = await prisma.banner.findMany({
            orderBy: { sortOrder: 'asc' }
        });
        return { success: true, banners };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createBannerAction(email: string, formData: FormData) {
    try {
        await requireAdmin(email);

        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string;
        const ctaText = formData.get('ctaText') as string;
        const ctaLink = formData.get('ctaLink') as string;
        const position = formData.get('position') as string;

        let imageUrl = '';
        const imageFile = formData.get('image') as File;

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const key = `banners/${Date.now()}-${imageFile.name}`;
            const upload = await uploadFile(buffer, key, imageFile.type);
            imageUrl = upload.url;
        }

        const banner = await prisma.banner.create({
            data: {
                title,
                subtitle,
                ctaText,
                ctaLink,
                imageUrl,
                position,
                isActive: true
            }
        });

        revalidatePath('/admin/marketing/banners');
        return { success: true, banner };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ... existing imports

export async function getBannerByIdAction(email: string, id: string) {
    try {
        await requireAdmin(email);
        const banner = await prisma.banner.findUnique({ where: { id } });
        return { success: true, banner };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateBannerAction(email: string, id: string, formData: FormData) {
    try {
        await requireAdmin(email);

        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string;
        const ctaText = formData.get('ctaText') as string;
        const ctaLink = formData.get('ctaLink') as string;
        const position = formData.get('position') as string;
        const isActive = formData.get('isActive') === 'true';

        let imageUrl = undefined;
        const imageFile = formData.get('image') as File;

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const key = `banners/${Date.now()}-${imageFile.name}`;
            const upload = await uploadFile(buffer, key, imageFile.type);
            imageUrl = upload.url;
        }

        const banner = await prisma.banner.update({
            where: { id },
            data: {
                title,
                subtitle,
                ctaText,
                ctaLink,
                position,
                isActive,
                ...(imageUrl && { imageUrl })
            }
        });

        revalidatePath('/admin/marketing/banners');
        return { success: true, banner };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteBannerAction(email: string, id: string) {
    try {
        await requireAdmin(email);
        const banner = await prisma.banner.findUnique({ where: { id } });

        if (banner?.imageUrl) {
            const key = extractKeyFromUrl(banner.imageUrl);
            if (key) await deleteFile(key).catch(console.error);
        }

        await prisma.banner.delete({ where: { id } });
        revalidatePath('/admin/marketing/banners');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
