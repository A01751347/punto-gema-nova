'use client';

import { useCart } from '@/lib/cart/CartContext';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartDrawer() {
    const { isCartOpen, closeCart, items, subtotal } = useCart();

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
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer Panel */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">

                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-serif text-text-primary">Tu Carrito ({items.length})</h2>
                    <button
                        onClick={closeCart}
                        className="text-text-secondary hover:text-primary transition-colors text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <span className="text-4xl text-gray-200">🛍️</span>
                            <p className="text-text-secondary">Tu carrito está vacío.</p>
                            <Button onClick={closeCart} variant="outline" className="mt-4">
                                Continuar Comprando
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} isCompact={true} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Subtotal</span>
                            <span className="text-xl font-medium text-text-primary">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-text-secondary font-light text-center">
                            Impuestos y envío calculados en checkout
                        </p>
                        <div className="grid gap-3">
                            <Link href="/carrito" onClick={closeCart}>
                                <Button variant="outline" className="w-full bg-white">Ver Carrito Completo</Button>
                            </Link>
                            {/* Eventually link to Checkout */}
                            <Link href="/checkout" onClick={closeCart}>
                                <Button className="w-full shadow-lg">Finalizar Compra</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
