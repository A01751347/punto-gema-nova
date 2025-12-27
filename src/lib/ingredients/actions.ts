'use server';

import prisma from '@/lib/db/prisma';

export async function getIngredients() {
    try {
        const ingredients = await prisma.ingredient.findMany({
            orderBy: { name: 'asc' },
            include: {
                products: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                slug: true
                            }
                        }
                    }
                }
            }
        });
        return ingredients;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return [];
    }
}

export async function getIngredientBySlug(slug: string) {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: { slug },
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                references: {
                    include: {
                        reference: true
                    }
                }
            }
        });
        return ingredient;
    } catch (error) {
        console.error('Error fetching ingredient:', error);
        return null;
    }
}
