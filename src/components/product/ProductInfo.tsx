'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/cart/CartContext';

interface ProductInfoProps {
    product: {
        id: string;
        name: string;
        tagline?: string | null;
        price: number;
        description: string;
        benefits: string[];
        size: string;
        slug: string;
        images?: string[];
    };
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            slug: product.slug,
            size: product.size,
            image: product.images?.[0]
        });
    };

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    return (
        <div className="sticky top-24 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-serif text-text-primary mb-2">
                    {product.name}
                </h1>
                {product.tagline && (
                    <p className="text-lg text-text-secondary font-light">
                        {product.tagline}
                    </p>
                )}
            </div>

            {/* Price & Size */}
            <div className="flex items-end gap-4 border-b border-gray-100 pb-6">
                <span className="text-2xl font-medium text-text-primary">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                </span>
                <span className="text-text-secondary mb-1 font-light">
                    / {product.size}
                </span>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-text-secondary font-light">
                <p>{product.description}</p>
            </div>

            {/* Benefits Highlights */}
            {product.benefits && product.benefits.length > 0 && (
                <ul className="space-y-2">
                    {product.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-text-primary">
                            <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {benefit}
                        </li>
                    ))}
                </ul>
            )}

            {/* Actions */}
            <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                            onClick={decrement}
                            className="w-10 h-12 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                        >
                            -
                        </button>
                        <span className="w-10 text-center font-medium text-text-primary">
                            {quantity}
                        </span>
                        <button
                            onClick={increment}
                            className="w-10 h-12 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                        >
                            +
                        </button>
                    </div>

                    {/* Add Button */}
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 h-12 text-base shadow-lg"
                    >
                        Agregar al Carrito
                    </Button>
                </div>

                <p className="text-xs text-center text-text-secondary font-light">
                    Envío gratis en compras mayores a $1,300 MXN
                </p>
            </div>
        </div>
    );
}
