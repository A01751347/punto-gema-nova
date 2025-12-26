'use client';

import { useCart } from '@/lib/cart/CartContext';
import { createOrder } from '@/app/actions/createOrder';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useActionState } from 'react';

export default function CheckoutPage() {
    const { items, subtotal } = useCart();
    const router = useRouter();
    // Initialize form state
    const [state, dispatch, isPending] = useActionState(createOrder, { message: '', errors: {} });

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            router.push('/carrito');
        }
    }, [items, router]);

    if (items.length === 0) return null;

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-serif text-text-primary mb-8 text-center">
                    Finalizar Compra
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <form action={dispatch} className="space-y-8">
                            {/* Hidden Cart Data */}
                            <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

                            {/* Section: Contact */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h2 className="text-xl font-medium mb-4">Contacto</h2>
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    required
                                    fullWidth
                                />
                            </div>

                            {/* Section: Shipping */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                <h2 className="text-xl font-medium mb-4">Dirección de Envío</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Nombre" name="firstName" placeholder="Ana" required fullWidth />
                                    <Input label="Apellidos" name="lastName" placeholder="García" required fullWidth />
                                </div>
                                <Input label="Dirección" name="address" placeholder="Calle y número" required fullWidth />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input label="Ciudad" name="city" placeholder="CDMX" required fullWidth />
                                    <Input label="Estado" name="state" placeholder="CDMX" required fullWidth />
                                    <Input label="C.P." name="postalCode" placeholder="00000" required fullWidth />
                                </div>
                                <Input label="Teléfono" name="phone" placeholder="55 1234 5678" required fullWidth />
                            </div>

                            {/* Section: Payment (Mock) */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h2 className="text-xl font-medium mb-4">Pago</h2>
                                <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-primary" />
                                    <span className="font-medium text-text-primary">Tarjeta de Crédito (Simulada)</span>
                                </div>
                                <p className="text-xs text-text-secondary mt-2 pl-7">
                                    Para esta demo, el pago se procesará como exitoso automáticamente.
                                </p>
                            </div>

                            <Button type="submit" className="w-full text-lg h-14 shadow-lg">
                                Confirmar Pedido
                            </Button>
                        </form>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-cream-light p-8 rounded-2xl sticky top-28">
                            <h2 className="text-lg font-serif text-text-primary mb-4">Resumen</h2>
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-3 text-sm">
                                        <div className="w-12 h-14 bg-white rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-300">
                                            {item.quantity}x
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium truncate">{item.name}</p>
                                            <p className="text-text-secondary font-light">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span>{subtotal > 999 ? 'Gratis' : '$150.00'}</span>
                                </div>
                                <div className="flex justify-between text-lg font-medium pt-2 text-primary">
                                    <span>Total</span>
                                    <span>${(subtotal + (subtotal > 999 ? 0 : 150)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
