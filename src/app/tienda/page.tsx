import prisma from '@/lib/db/prisma';
import ProductCard from '@/components/shop/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';
import SortDropdown from '@/components/shop/SortDropdown';

export const dynamic = 'force-dynamic';

async function getProducts(searchParams: { category?: string; sort?: string }) {
    const { category, sort } = searchParams;

    const orderBy = (() => {
        switch (sort) {
            case 'price_asc': return { price: 'asc' as const };
            case 'price_desc': return { price: 'desc' as const };
            case 'featured': return { isFeatured: 'desc' as const };
            case 'newest':
            default: return { createdAt: 'desc' as const };
        }
    })();

    const where = {
        isActive: true,
        ...(category && {
            categories: {
                some: {
                    category: {
                        name: category // TODO: Change to slug match for robustness
                    }
                }
            }
        })
    };

    const products = await prisma.product.findMany({
        where,
        orderBy,
        include: {
            categories: { include: { category: true } },
        }
    });

    return products;
}

async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
}

export default async function ShopPage({
    searchParams,
}: {
    searchParams: { category?: string; sort?: string }
}) {
    const products = await getProducts(searchParams);
    const categories = await getCategories();

    return (
        <div className="bg-white min-h-screen pt-0 pb-20">
            {/* Header */}
            <div className="bg-cream-light py-16 md:py-24 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-sm font-bold tracking-widest text-primary/60 uppercase mb-4 block">
                        Colección Completa
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
                        Tienda
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
                        Explora nuestra gama de productos formulados con precisión clínica y conciencia botánica.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <FilterSidebar categories={categories} concerns={[]} />

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-text-secondary text-sm">
                                {products.length} productos encontrados
                            </span>
                            <SortDropdown />
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product as any} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-text-secondary text-lg">No encontramos productos en esta selección.</p>
                                <a href="/tienda" className="text-primary hover:underline mt-4 inline-block">Ver todos los productos</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
