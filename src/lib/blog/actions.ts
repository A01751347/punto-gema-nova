'use server';

import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Schema for validation
const PostSchema = z.object({
    title: z.string().min(3, "El título es requerido"),
    slug: z.string().min(3, "El slug es requerido"),
    excerpt: z.string().optional(),
    content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
    category: z.string().optional(),
    featuredImage: z.string().url().optional().or(z.literal('')),
    isPublished: z.boolean().default(false),
});

export async function getPublishedPosts(limit = 10) {
    try {
        return await prisma.blogPost.findMany({
            where: { isPublished: true },
            orderBy: { publishedAt: 'desc' },
            take: limit,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string) {
    try {
        return await prisma.blogPost.findUnique({
            where: { slug },
        });
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

// Admin Actions

export async function getAllPosts() {
    try {
        return await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error('Error fetching all posts:', error);
        return [];
    }
}

export async function createPost(prevState: any, formData: FormData) {
    const rawData = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        category: formData.get('category'),
        featuredImage: formData.get('featuredImage'),
        isPublished: formData.get('isPublished') === 'on',
    };

    // Simple manual slug generation if empty (though UI should handle it)
    if (!rawData.slug && typeof rawData.title === 'string') {
        rawData.slug = rawData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    const validatedFields = PostSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error en los campos. Revisa el formulario.',
        };
    }

    try {
        await prisma.blogPost.create({
            data: {
                ...validatedFields.data,
                publishedAt: validatedFields.data.isPublished ? new Date() : null,
            },
        });

        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        return { success: true, message: 'Artículo creado exitosamente' };
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Error al crear la base de datos. El slug podría estar duplicado.',
        };
    }
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
    const rawData = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        category: formData.get('category'),
        featuredImage: formData.get('featuredImage'),
        isPublished: formData.get('isPublished') === 'on',
    };

    const validatedFields = PostSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error en los campos.',
        };
    }

    try {
        await prisma.blogPost.update({
            where: { id },
            data: {
                ...validatedFields.data,
                // Only update publishedAt if it's being published for the first time or keep existing? 
                // For simplicity, update it if published is true.
                publishedAt: validatedFields.data.isPublished ? new Date() : null,
            },
        });

        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        return { success: true, message: 'Artículo actualizado exitosamente' };
    } catch (error) {
        return {
            message: 'Error al actualizar.',
        };
    }
}

export async function deletePost(id: string) {
    try {
        await prisma.blogPost.delete({ where: { id } });
        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        return { success: true };
    } catch (error) {
        return { success: false, message: 'Error al eliminar.' };
    }
}
