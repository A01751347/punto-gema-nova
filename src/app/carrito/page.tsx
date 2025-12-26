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

    const FREE_SHIPPING_THRESHOLD = 999;
    const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

    return (
        <div className="bg-white min-h-screen pt-0 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-serif text-text-primary mt-12 mb-12 text-center md:text-left">
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
                        <div className="bg-[#F2EFE9] p-8 rounded-xl sticky top-28 shadow-sm border border-[#E6E0D9]">
                            <h2 className="text-xl font-medium text-[#2c4a52] mb-6 pb-4 border-b border-[#E6E0D9]">Resumen del Pedido</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Envío</span>
                                    {remaining <= 0 ? (
                                        <span className="text-[#2c4a52] font-medium">Gratis</span>
                                    ) : (
                                        <span className="text-gray-500 italic">Calculado al final</span>
                                    )}
                                </div>
                                {remaining > 0 && (
                                    <div className="py-2 px-3 bg-white/60 rounded text-xs text-gray-600 text-center mt-2">
                                        Agrega <span className="font-bold text-[#2c4a52]">${remaining.toFixed(2)}</span> para envío gratis
                                    </div>
                                )}
                                <div className="border-t border-[#E6E0D9] pt-6 flex justify-between items-end">
                                    <span className="text-base font-medium text-[#2c4a52]">Total Estimado</span>
                                    <span className="text-3xl font-medium text-[#2c4a52]">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full py-4 text-base bg-[#2c4a52] hover:bg-[#1e343a] text-white shadow-none rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                    Continuar Compra
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
