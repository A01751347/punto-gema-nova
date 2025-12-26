'use client';

import { useCart } from '@/lib/cart/CartContext';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartDrawer() {
    const { isCartOpen, closeCart, items, subtotal, totalItems } = useCart();
    const FREE_SHIPPING_THRESHOLD = 999;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

    // Disable body scroll when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in cursor-pointer"
                onClick={closeCart}
            />

            {/* Drawer Panel */}
            <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slide-in-right transform">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <h2 className="text-2xl font-serif text-primary">Tu Carrito ({totalItems})</h2>
                    <button
                        onClick={closeCart}
                        className="p-2 -mr-2 text-gray-400 hover:text-primary transition-colors text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Free Shipping Progress */}
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                    {remaining > 0 ? (
                        <p className="text-sm text-text-secondary mb-2 text-center">
                            Te faltan <span className="font-bold text-primary">${remaining.toFixed(2)}</span> para envío gratis
                        </p>
                    ) : (
                        <p className="text-sm text-green-700 font-medium mb-2 text-center flex items-center justify-center gap-2">
                            <span>✨</span> ¡Tienes envío gratis!
                        </p>
                    )}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl">
                                🛍️
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-text-primary mb-2">Tu carrito está vacío</h3>
                                <p className="text-text-secondary font-light max-w-xs mx-auto">
                                    Parece que aún no has descubierto nuestros tratamientos.
                                </p>
                            </div>
                            <Button onClick={closeCart} variant="outline" className="mt-4 border-gray-300 text-text-primary hover:bg-gray-50">
                                Continuar Comprando
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} isCompact={true} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-10">
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center text-text-secondary">
                                <span>Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-text-secondary">
                                <span>Envío</span>
                                {remaining <= 0 ? (
                                    <span className="text-green-700 font-medium">Gratis</span>
                                ) : (
                                    <span className="text-sm">Calculado en checkout</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center text-lg font-medium text-primary pt-4 border-t border-gray-100">
                                <span>Total Estimado</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Link href="/checkout" onClick={closeCart}>
                                <Button className="w-full py-4 text-base shadow-lg hover:shadow-xl transition-shadow bg-primary text-white">
                                    Finalizar Compra
                                </Button>
                            </Link>
                            <Link href="/carrito" onClick={closeCart}>
                                <Button variant="ghost" className="w-full text-text-secondary hover:text-primary hover:bg-gray-50">
                                    Ver Carrito Detallado
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
