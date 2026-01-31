'use server';

import prisma from '@/lib/db/prisma';

export async function searchProducts(query: string) {
    if (!query || query.length < 2) return [];

    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { benefits: { hasSome: [query] } }, // Exact match in array, messy for partial
                    // Better search for tags/benefits if array:
                    // Postgres simple generic search
                ]
            },
            take: 5,
            select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: true,

            }
        });

        // If simple OR doesn't catch benefits well, we can improve later with full text search
        // For now, name and description are key.
        return products;
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}
