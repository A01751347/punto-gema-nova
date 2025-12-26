'use server';

import prisma from '@/lib/db/prisma';
import { uploadFile, deleteFile, extractKeyFromUrl } from '@/lib/storage/s3';
import { revalidatePath } from 'next/cache';

// Helper to check admin
async function requireAdmin(email: string) {
    const user = await prisma.user.findUnique({ where: { email }, select: { role: true } });
    if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
}

export async function getAdminProductsAction(email: string) {
    try {
        await requireAdmin(email);
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                sku: true,
                price: true,
                stock: true,
                isActive: true,
                images: true
                // could adding category relation later
            }
        });
        return { success: true, products };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getProductByIdAction(email: string, id: string) {
    try {
        await requireAdmin(email);
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return { success: false, error: 'Product not found' };
        return { success: true, product };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteProductAction(email: string, id: string) {
    try {
        await requireAdmin(email);

        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return { success: false, error: 'Product not found' };

        // Delete images from S3
        if (product.images && product.images.length > 0) {
            for (const imageUrl of product.images) {
                const key = extractKeyFromUrl(imageUrl);
                if (key) {
                    await deleteFile(key).catch(err => console.error('Failed to delete S3 file', err));
                }
            }
        }

        await prisma.product.delete({ where: { id } });
        revalidatePath('/admin/productos');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Helper to parse arrays
const parseArray = (str: string) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : [];

// Complex action: handling FormData for Create
export async function createProductAction(email: string, formData: FormData) {
    try {
        await requireAdmin(email);

        // Extract fields
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const sku = formData.get('sku') as string;
        const stock = parseInt(formData.get('stock') as string);
        const size = formData.get('size') as string;

        // Detailed fields
        const benefits = parseArray(formData.get('benefits') as string);
        const howToUse = formData.get('howToUse') as string;
        const whenToUse = formData.get('whenToUse') as string;
        const suitableFor = parseArray(formData.get('suitableFor') as string);
        const mechanism = formData.get('mechanism') as string;

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Handle Image Upload
        const imageFile = formData.get('image') as File;
        let imageUrls: string[] = [];

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const key = `products/${Date.now()}-${imageFile.name}`;
            const { url } = await uploadFile(buffer, key, imageFile.type);
            imageUrls.push(url);
        }

        // Create
        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                stock,
                sku,
                size: size || 'Standard',
                images: imageUrls,
                howToUse: howToUse || 'Aplicar diariamente.',
                whenToUse,
                benefits,
                suitableFor,
                mechanism,
                notSuitableFor: [], // Default empty
                isActive: true
            }
        });

        revalidatePath('/admin/productos');
        return { success: true, product };
    } catch (error: any) {
        console.error('Create product error:', error);
        return { success: false, error: error.message };
    }
}

export async function updateProductAction(email: string, id: string, formData: FormData) {
    try {
        await requireAdmin(email);

        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const stock = parseInt(formData.get('stock') as string);
        const size = formData.get('size') as string;
        const description = formData.get('description') as string;
        const isActive = formData.get('isActive') === 'true';

        // Detailed fields
        const benefits = parseArray(formData.get('benefits') as string);
        const howToUse = formData.get('howToUse') as string;
        const whenToUse = formData.get('whenToUse') as string;
        const suitableFor = parseArray(formData.get('suitableFor') as string);
        const mechanism = formData.get('mechanism') as string;

        // Handle New Image if uploaded
        const imageFile = formData.get('image') as File;
        let newImages = undefined;

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const key = `products/${Date.now()}-${imageFile.name}`;
            const { url } = await uploadFile(buffer, key, imageFile.type);
            // Verify existing images to append or replace? For MVP replace primary, or assume append logic needed. 
            // Let's Append to existing for now, or just replace array if we want simple 'Set Image' logic.
            // Usually dashboard replaces the 'Main' image or adds to gallery.
            // We'll Fetch current to append
            const current = await prisma.product.findUnique({ where: { id }, select: { images: true } });
            newImages = [...(current?.images || []), url];
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
                stock,
                size,
                description,
                isActive,
                benefits,
                howToUse,
                whenToUse,
                suitableFor,
                mechanism,
                ...(newImages && { images: newImages })
            }
        });

        revalidatePath('/admin/productos');
        revalidatePath(`/admin/productos/editar/${id}`);
        return { success: true, product };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
