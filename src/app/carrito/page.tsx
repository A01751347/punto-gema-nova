'use client';

import { useCart } from '@/lib/cart/CartContext';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CartPage() {
    const { items, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Carrito</span>
                <h1 className="text-3xl md:text-5xl font-serif mb-4">Tu Carrito</h1>
                <p className="text-text-secondary mb-8">
                    Aun no tienes piezas en tu carrito.
                </p>
                <Link href="/tienda">
                    <Button size="lg" className="h-12 px-8 text-sm tracking-wider uppercase">Explorar Tienda</Button>
                </Link>
            </div>
        );
    }

    const FREE_SHIPPING_THRESHOLD = 1300;
    const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4">
                <div className="pt-12 pb-8 border-b border-gray-100 mb-10">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">Carrito</span>
                    <h1 className="text-3xl md:text-4xl font-serif">Tu Carrito</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                    {/* Items */}
                    <div className="lg:col-span-2">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-cream p-8 sticky top-28">
                            <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-8">Resumen</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>Envio</span>
                                    {remaining <= 0 ? (
                                        <span className="text-accent font-medium">Gratis</span>
                                    ) : (
                                        <span className="text-text-light">Calculado al checkout</span>
                                    )}
                                </div>
                                {remaining > 0 && (
                                    <p className="text-xs text-text-light pt-1">
                                        Agrega ${remaining.toLocaleString('es-MX', { minimumFractionDigits: 2 })} mas para envio gratis.
                                    </p>
                                )}
                                <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                                    <span className="text-sm font-medium">Total Estimado</span>
                                    <span className="text-2xl font-serif">${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-12 text-sm tracking-wider uppercase">
                                    Continuar Compra
                                </Button>
                            </Link>

                            <div className="text-center mt-4">
                                <Link href="/tienda" className="text-xs text-text-light hover:text-primary transition-colors border-b border-text-light/30 pb-0.5">
                                    Seguir Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
