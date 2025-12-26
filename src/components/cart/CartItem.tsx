'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType, useCart } from '@/lib/cart/CartContext';

interface CartItemProps {
    item: CartItemType;
    isCompact?: boolean; // For drawer view
}

export default function CartItem({ item, isCompact = false }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className={`flex gap-4 ${isCompact ? 'py-4' : 'py-6'} border-b border-gray-100 last:border-0`}>
            {/* Image */}
            <div className={`relative bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden ${isCompact ? 'w-20 h-24' : 'w-24 h-32 md:w-32 md:h-40'}`}>
                {item.image ? (
                    // Placeholder for now as we don't have real images
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        {item.name}
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        Sin Imagen
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className={`font-medium text-text-primary ${isCompact ? 'text-sm' : 'text-base md:text-lg'}`}>
                            <Link href={`/tienda/${item.slug}`} className="hover:text-primary transition-colors">
                                {item.name}
                            </Link>
                        </h3>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-secondary hover:text-red-500 text-xs md:text-sm transition-colors"
                            aria-label="Eliminar producto"
                        >
                            ✕
                        </button>
                    </div>
                    {item.size && (
                        <p className="text-xs text-text-secondary font-light mt-1">{item.size}</p>
                    )}
                </div>

                <div className="flex justify-between items-end mt-2">

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded text-sm">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            disabled={item.quantity <= 1} // Optional: allow going to 0 to remove?
                        >
                            -
                        </button>
                        <span className="w-8 text-center text-text-primary">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            +
                        </button>
                    </div>

                    <p className={`font-medium text-text-primary ${isCompact ? 'text-sm' : 'text-lg'}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
