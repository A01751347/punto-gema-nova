'use client';

import { useCart } from '@/lib/cart/CartContext';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';
import { ShoppingBag, X, Truck, Sparkles } from 'lucide-react';

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
                    <h2 className="text-2xl font-serif text-primary flex items-center gap-2">
                        Tu Carrito <span className="text-base text-gray-400 font-sans font-light">({totalItems})</span>
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 -mr-2 text-gray-400 hover:text-primary transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Free Shipping Progress */}
                <div className="px-6 py-5 bg-gray-50/30 border-b border-gray-100">
                    {remaining > 0 ? (
                        <div className="flex items-center justify-center gap-2 mb-3 text-sm text-text-secondary">
                            <Truck size={16} className="text-gray-400" />
                            <p>
                                Te faltan <span className="font-bold text-primary">${remaining.toFixed(2)}</span> para envío gratis
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 mb-3 text-green-700 text-sm font-medium">
                            <Sparkles size={16} />
                            <p>¡Felicidades! Tienes envío gratis</p>
                        </div>
                    )}
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2 relative group">
                                <div className="absolute inset-0 bg-primary/5 rounded-full scale-100 group-hover:scale-110 transition-transform duration-500" />
                                <ShoppingBag size={40} className="text-gray-300 relative z-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-primary mb-3">Tu carrito está vacío</h3>
                                <p className="text-text-secondary font-light max-w-[250px] mx-auto leading-relaxed text-sm">
                                    Parece que aún no has descubierto tus piezas de Punto Gema Nova.
                                </p>
                            </div>
                            <Button onClick={closeCart} className="mt-2 w-full max-w-[200px] shadow-sm hover:shadow-md transition-all">
                                Explorar Tienda
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
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center text-base text-text-secondary">
                                <span>Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-base text-text-secondary">
                                <span>Envío</span>
                                {remaining <= 0 ? (
                                    <span className="text-green-700 font-medium">Gratis</span>
                                ) : (
                                    <span className="text-sm">Calculado en checkout</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center text-xl font-medium text-primary pt-4 border-t border-gray-100">
                                <span>Total Estimado</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link href="/checkout" onClick={closeCart}>
                                <Button className="w-full py-4 text-base font-medium shadow-md hover:shadow-lg transition-shadow bg-primary text-white">
                                    Finalizar Compra
                                </Button>
                            </Link>
                            <div className="grid grid-cols-2 pt-4 gap-3">
                                <Link href="/carrito" onClick={closeCart}>
                                    <Button variant="ghost" className="w-full text-base py-3 px-0 text-text-secondary hover:text-primary hover:bg-gray-50 border border-gray-300">
                                        Ver Carrito
                                    </Button>
                                </Link>
                                <Link href="/tienda" onClick={closeCart}>
                                    <Button variant="outline" className="w-full text-base py-3 px-0 text-text-secondary hover:text-primary border-gray-200">
                                        Seguir Comprando
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
