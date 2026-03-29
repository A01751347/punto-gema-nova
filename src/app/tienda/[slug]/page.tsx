import { notFound } from 'next/navigation';
import prisma from '@/lib/db/prisma';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import CraftsmanshipSection from '@/components/product/CraftsmanshipSection';
import MaterialsList from '@/components/product/MaterialsList';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
    const product = await prisma.product.findFirst({
        where: { slug, isActive: true },
        include: {
            materials: {
                include: {
                    material: true,
                },
            },
        },
    });

    if (!product) return null;
    return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // Transform data for Craftsmanship Section
    const primaryMaterials = product.materials
        .filter(pm => pm.isPrimary)
        .map(pm => ({
            name: pm.material.name,
            description: pm.material.description,
            benefits: pm.material.benefits
        }));

    // Transform data for Full List
    const allMaterials = product.materials.map(pm => ({
        name: pm.material.name,
        type: pm.material.type || undefined
    }));

    return (
        <div className="bg-white min-h-screen pt-8 pb-20">
            <div className="container mx-auto px-4 md:px-8">

                {/* Breadcrumbs */}
                <div className="mb-8">
                    <Breadcrumbs
                        items={[
                            { label: 'Tienda', href: '/tienda' },
                            { label: product.name, href: `/tienda/${slug}` }
                        ]}
                    />
                </div>

                {/* Top Section: Gallery + Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-32">
                    <ProductGallery images={product.images} />
                    <ProductInfo product={product} />
                </div>

                {/* Craftsmanship Section */}
                <div className="mb-20 lg:mb-24">
                    <CraftsmanshipSection
                        careInstructions={product.careInstructions}
                        description={product.description}
                        materials={primaryMaterials}
                    />
                </div>

                {/* Materials List */}
                <div className="max-w-4xl mx-auto">
                    <MaterialsList materials={allMaterials} />
                </div>

            </div>
        </div>
    );
}
