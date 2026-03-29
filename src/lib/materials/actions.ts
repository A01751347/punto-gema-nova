'use server';

import prisma from '@/lib/db/prisma';

export async function getMaterials() {
    try {
        const materials = await prisma.material.findMany({
            orderBy: { name: 'asc' },
        });
        return materials;
    } catch (error) {
        console.error('Error fetching materials:', error);
        return [];
    }
}

export async function getMaterialBySlug(slug: string) {
    try {
        const material = await prisma.material.findUnique({
            where: { slug },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return material;
    } catch (error) {
        console.error('Error fetching material:', error);
        return null;
    }
}
