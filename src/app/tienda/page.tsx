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
                        name: category
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
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="py-16 md:py-24 bg-cream border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                        Coleccion Completa
                    </span>
                    <h1 className="text-4xl md:text-6xl mb-4">
                        Tienda
                    </h1>
                    <p className="text-text-secondary max-w-xl leading-relaxed">
                        Joyeria artesanal elaborada con piedras semipreciosas y materiales selectos.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                    {/* Sidebar */}
                    <FilterSidebar categories={categories} />

                    {/* Main */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                            <span className="text-sm text-text-light">
                                {products.length} {products.length === 1 ? 'pieza' : 'piezas'}
                            </span>
                            <SortDropdown />
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product as any} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <p className="text-text-secondary mb-4">No encontramos piezas en esta seleccion.</p>
                                <a href="/tienda" className="text-sm text-accent hover:text-accent-dark transition-colors border-b border-accent/30 pb-0.5">
                                    Ver todas las piezas
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
