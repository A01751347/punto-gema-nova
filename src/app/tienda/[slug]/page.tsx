import { notFound } from 'next/navigation';
import prisma from '@/lib/db/prisma';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ScienceSection from '@/components/product/ScienceSection';
import IngredientsList from '@/components/product/IngredientsList';

interface ProductPageProps {
    params: {
        slug: string;
    };
}

// Force dynamic rendering to ensure fresh data if valid stock changes concern us,
// or use revalidate. For now, dynamic is safer for dev.
export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
    const product = await prisma.product.findFirst({
        where: { slug, isActive: true },
        include: {
            ingredients: {
                include: {
                    ingredient: true,
                },
            },
        },
    });

    if (!product) return null;
    return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    // Transform data for Science Section
    const keyIngredients = product.ingredients
        .filter(pi => pi.isKeyIngredient)
        .map(pi => ({
            name: pi.ingredient.name,
            description: pi.ingredient.description,
            benefits: pi.ingredient.benefits
        }));

    // Transform data for Full List
    const allIngredients = product.ingredients.map(pi => ({ name: pi.ingredient.name }));

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8">

                {/* Top Section: Gallery + Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-32">
                    <ProductGallery images={product.images} />
                    <ProductInfo product={product} />
                </div>

                {/* Science Section */}
                <div className="mb-20 lg:mb-24">
                    <ScienceSection
                        mechanism={product.mechanism}
                        expectedResults={product.expectedResults}
                        ingredients={keyIngredients}
                    />
                </div>

                {/* Ingredients List & Details */}
                <div className="max-w-4xl mx-auto">
                    <IngredientsList ingredients={allIngredients} />
                </div>

            </div>
        </div>
    );
}
