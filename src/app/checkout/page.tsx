'use client';

import { useCart } from '@/lib/cart/CartContext';
import { createOrder } from '@/app/actions/createOrder';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useActionState } from 'react';
import {
    Lock,
    ShieldCheck,
    Truck,
    CreditCard,
    ShoppingBag,
    ArrowRight,
    MapPin,
    User,
    Mail
} from 'lucide-react';
import Image from 'next/image';

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

    const shippingCost = subtotal > 999 ? 0 : 150;
    const total = subtotal + shippingCost;

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="flex items-center justify-center mb-10 gap-2 text-primary/60">
                    <Lock size={16} />
                    <span className="text-sm font-medium uppercase tracking-widest">Checkout Seguro SSL 256-bit</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-7 space-y-8">

                        <form action={dispatch} id="checkout-form" className="space-y-8">
                            <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

                            {/* Section 1: Contact */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary">
                                        <User size={20} />
                                    </div>
                                    <h2 className="text-xl font-serif text-primary">Información de Contacto</h2>
                                </div>

                                <div className="space-y-4">
                                    <Input
                                        label="Correo Electrónico"
                                        name="email"
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        required
                                        fullWidth
                                        className="bg-gray-50 border-gray-100 focus:bg-white"
                                    />
                                    <div className="flex items-start gap-2 text-xs text-gray-500">
                                        <ShieldCheck size={14} className="text-secondary mt-0.5" />
                                        <p>Tu privacidad es sagrada. No compartimos tus datos.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Shipping */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary">
                                        <MapPin size={20} />
                                    </div>
                                    <h2 className="text-xl font-serif text-primary">Dirección de Envío</h2>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <Input label="Nombre(s)" name="firstName" placeholder="Ana" required fullWidth />
                                        <Input label="Apellidos" name="lastName" placeholder="García" required fullWidth />
                                    </div>
                                    <Input label="Calle y Número" name="address" placeholder="Av. Reforma 222, Depto 401" required fullWidth />

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                        <Input label="Ciudad" name="city" placeholder="CDMX" required fullWidth />
                                        <Input label="Estado" name="state" placeholder="CDMX" required fullWidth />
                                        <Input label="C.P." name="postalCode" placeholder="06600" required fullWidth />
                                    </div>
                                    <Input label="Teléfono Celular" name="phone" placeholder="55 1234 5678" required fullWidth />
                                </div>
                            </div>

                            {/* Section 3: Payment */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary">
                                        <CreditCard size={20} />
                                    </div>
                                    <h2 className="text-xl font-serif text-primary">Método de Pago</h2>
                                </div>

                                <div className="p-5 border border-primary/20 bg-primary/[0.02] rounded-xl flex items-center justify-between cursor-not-allowed opacity-80">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                                            <span className="text-xs font-bold text-gray-500">CARD</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-primary">Tarjeta de Crédito / Débito</p>
                                            <p className="text-xs text-gray-500">Procesado de forma segura</p>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase tracking-wide">
                                        Simulado
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center">
                                    Esta es una tienda demo. No se realizará ningún cargo real.
                                </p>
                            </div>

                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-primary text-white p-8 md:p-10 rounded-3xl sticky top-28 shadow-xl relative overflow-hidden">
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                            <h2 className="text-2xl font-serif mb-8 flex items-center gap-2">
                                <ShoppingBag size={24} className="text-accent" />
                                Resumen de Orden
                            </h2>

                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar-dark">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-white/30">IMG</div>
                                            )}
                                            <div className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-bl-lg">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm leading-tight mb-1">{item.name}</h4>
                                            <p className="text-accent text-sm">${item.price.toLocaleString('es-MX')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-6 space-y-3">
                                <div className="flex justify-between text-white/70 text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString('es-MX')}</span>
                                </div>
                                <div className="flex justify-between text-white/70 text-sm">
                                    <span className="flex items-center gap-2">
                                        <Truck size={14} /> Envío
                                    </span>
                                    <span>
                                        {shippingCost === 0 ? <span className="text-accent font-bold">Gratis</span> : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="border-t border-white/20 pt-4 mt-4 flex justify-between items-end">
                                    <span className="text-lg font-serif">Total</span>
                                    <span className="text-3xl font-serif text-accent">
                                        ${total.toLocaleString('es-MX')}
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full mt-8 bg-accent hover:bg-white hover:text-primary text-primary font-bold h-16 text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-none"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Confirmar Compra <ArrowRight size={20} />
                                </span>
                            </Button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40">
                                <ShieldCheck size={12} />
                                <span>Garantía de Satisfacción YUTNÜÜ</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
