import Link from "next/link";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        tagline?: string | null;
        price: number;
        isNew: boolean;
        images?: string[];
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/tienda/${product.slug}`} className="group block">
            <div className="aspect-[3/4] bg-cream overflow-hidden mb-4 relative">
                <div className="w-full h-full flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-500">
                    {product.images && product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-text-light text-xs tracking-wider uppercase">Foto</span>
                    )}
                </div>

                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-[10px] tracking-[0.15em] uppercase px-2.5 py-1">
                        Nuevo
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                    {product.name}
                </h3>
                <p className="text-xs text-text-light line-clamp-1">
                    {product.tagline || "Pieza artesanal"}
                </p>
                <p className="text-sm text-text-primary">
                    ${product.price.toLocaleString('es-MX')}
                </p>
            </div>
        </Link>
    );
}
