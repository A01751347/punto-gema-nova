'use client';

import { useCart } from '@/lib/cart/CartContext';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CartPage() {
    const { items, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
                <h1 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">Tu Carrito</h1>
                <p className="text-lg text-text-secondary font-light mb-8">
                    Aún no tienes productos en tu carrito.
                </p>
                <Link href="/tienda">
                    <Button size="lg">Explorar Tienda</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-serif text-text-primary mb-12 text-center md:text-left">
                    Tu Carrito
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-cream-light p-8 rounded-2xl sticky top-28">
                            <h2 className="text-xl font-serif text-text-primary mb-6">Resumen de Compra</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-text-secondary">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Envío</span>
                                    <span className="text-green-600 font-medium">Gratis</span> {/* Logic can vary */}
                                </div>
                                <div className="border-t border-primary/10 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-medium text-text-primary">Total</span>
                                    <span className="text-2xl font-serif text-text-primary">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-12 text-lg shadow-xl mb-4">
                                    Ir a Pagar
                                </Button>
                            </Link>

                            <div className="text-center">
                                <Link href="/tienda" className="text-sm text-text-secondary hover:text-primary underline">
                                    Seguir Comprando
                                </Link>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-4 text-primary/40">
                                {/* Payment Icons Placeholders */}
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
