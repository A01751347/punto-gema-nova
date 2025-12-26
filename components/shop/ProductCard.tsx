import Link from "next/link";
import Button from "@/components/ui/Button";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        tagline?: string | null;
        price: number;
        isNew: boolean;
        images?: string[]; // Assuming images are strings or objects, let's allow flexibility or fix to schema
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/tienda/${product.slug}`} className="group cursor-pointer block">
            <div className="aspect-[4/5] bg-white overflow-hidden mb-5 md:mb-6 relative hover:shadow-xl transition-all duration-500 rounded-xl">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    {product.images && product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400 font-light">Imagen de Producto</span>
                    )}
                </div>

                {product.isNew && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-sm">
                        Nuevo
                    </span>
                )}

                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="w-full inline-flex items-center justify-center font-medium rounded-lg px-6 py-3 bg-white text-[#2c4a52] hover:bg-[#2c4a52] hover:text-white shadow-lg text-sm transition-colors duration-200">
                        Ver Detalles
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium text-text-primary group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-text-secondary font-light line-clamp-1">
                    {product.tagline || "Tratamiento avanzado"}
                </p>
                <p className="text-base font-medium text-text-primary">
                    ${product.price}
                </p>
            </div>
        </Link>
    );
}
