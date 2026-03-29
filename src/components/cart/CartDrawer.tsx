'use client';

import { useCart } from '@/lib/cart/CartContext';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartDrawer() {
    const { isCartOpen, closeCart, items, subtotal, totalItems } = useCart();
    const FREE_SHIPPING_THRESHOLD = 1300;
    const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

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
                className="absolute inset-0 bg-black/30 animate-fade-in cursor-pointer"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full flex flex-col animate-slide-in-right">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-serif">Carrito</h2>
                        <span className="text-xs text-text-light">{totalItems} {totalItems === 1 ? 'pieza' : 'piezas'}</span>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 -mr-2 text-text-light hover:text-primary transition-colors text-sm"
                    >
                        Cerrar
                    </button>
                </div>

                {/* Shipping progress */}
                {items.length > 0 && (
                    <div className="px-6 py-4 border-b border-gray-100">
                        <p className="text-xs text-text-secondary mb-2">
                            {remaining > 0 ? (
                                <>Agrega <span className="font-medium text-primary">${remaining.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span> para envio gratis</>
                            ) : (
                                <span className="text-accent font-medium">Envio gratis incluido</span>
                            )}
                        </p>
                        <div className="w-full h-px bg-gray-200">
                            <div
                                className="h-full bg-accent transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <p className="text-lg font-serif mb-2">Carrito vacio</p>
                            <p className="text-sm text-text-light mb-6">Explora nuestra coleccion de joyeria artesanal.</p>
                            <Button onClick={closeCart} className="h-10 px-6 text-sm tracking-wider uppercase">
                                Ver Tienda
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-0">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} isCompact={true} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white">
                        <div className="space-y-2 mb-5">
                            <div className="flex justify-between text-sm text-text-secondary">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between text-sm text-text-secondary">
                                <span>Envio</span>
                                {remaining <= 0 ? (
                                    <span className="text-accent">Gratis</span>
                                ) : (
                                    <span className="text-text-light">En checkout</span>
                                )}
                            </div>
                            <div className="flex justify-between items-end pt-3 border-t border-gray-100">
                                <span className="text-sm font-medium">Total</span>
                                <span className="text-xl font-serif">${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link href="/checkout" onClick={closeCart}>
                                <Button className="w-full h-12 text-sm tracking-wider uppercase">
                                    Finalizar Compra
                                </Button>
                            </Link>
                            <div className="flex gap-2">
                                <Link href="/carrito" onClick={closeCart} className="flex-1">
                                    <Button variant="outline" className="w-full h-10 text-xs tracking-wider uppercase">
                                        Ver Carrito
                                    </Button>
                                </Link>
                                <button
                                    onClick={closeCart}
                                    className="flex-1 h-10 text-xs tracking-wider uppercase text-text-light hover:text-primary transition-colors border border-gray-200"
                                >
                                    Seguir Comprando
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
