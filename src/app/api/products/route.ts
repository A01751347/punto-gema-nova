import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get('featured');
        const limit = searchParams.get('limit');

        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                ...(featured === 'true' && { isFeatured: true }),
            },
            include: {
                categories: {
                    include: {
                        category: true,
                    },
                },
                materials: {
                    where: {
                        isPrimary: true,
                    },
                    include: {
                        material: true,
                    },
                },
            },
            orderBy: [
                { isFeatured: 'desc' },
                { isNew: 'desc' },
                { createdAt: 'desc' },
            ],
            take: limit ? parseInt(limit) : undefined,
        });

        return NextResponse.json({ success: true, data: products });
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
