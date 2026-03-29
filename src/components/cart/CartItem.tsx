'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType, useCart } from '@/lib/cart/CartContext';

interface CartItemProps {
    item: CartItemType;
    isCompact?: boolean;
}

export default function CartItem({ item, isCompact = false }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className={`flex gap-4 ${isCompact ? 'py-4' : 'py-6'} border-b border-gray-100 last:border-0`}>
            {/* Image */}
            <div className={`relative bg-cream flex-shrink-0 overflow-hidden ${isCompact ? 'w-18 h-22' : 'w-24 h-32 md:w-28 md:h-36'}`}>
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-light text-xs">
                        Foto
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-medium text-text-primary ${isCompact ? 'text-sm' : 'text-base'}`}>
                            <Link href={`/tienda/${item.slug}`} className="hover:text-accent transition-colors">
                                {item.name}
                            </Link>
                        </h3>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-light hover:text-red-500 text-xs transition-colors shrink-0"
                            aria-label="Eliminar"
                        >
                            Quitar
                        </button>
                    </div>
                    {item.size && (
                        <p className="text-xs text-text-light mt-1">{item.size}</p>
                    )}
                </div>

                <div className="flex justify-between items-end mt-2">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 text-sm">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors text-text-secondary"
                            disabled={item.quantity <= 1}
                        >
                            −
                        </button>
                        <span className="w-7 text-center text-text-primary text-xs">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors text-text-secondary"
                        >
                            +
                        </button>
                    </div>

                    <p className={`font-medium text-text-primary ${isCompact ? 'text-sm' : 'text-base'}`}>
                        ${(item.price * item.quantity).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
        </div>
    );
}
