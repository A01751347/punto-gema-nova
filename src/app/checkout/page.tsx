'use client';

import { useCart } from '@/lib/cart/CartContext';
import { createOrder } from '@/app/actions/createOrder';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

import { useAuth } from '@/lib/auth/auth-context';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, subtotal } = useCart();
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [state, dispatch, isPending] = useActionState(createOrder, { message: '', errors: {} });
    const [isGuest, setIsGuest] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (!isLoading && items.length === 0) {
            router.push('/carrito');
        }
    }, [items, router, isLoading]);

    if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-primary">Cargando...</div>;
    if (items.length === 0) return null;

    const shippingCost = subtotal > 999 ? 0 : 150;
    const total = subtotal + shippingCost;

    // Auth Choice Screen
    if (!isAuthenticated && !isGuest) {
        return (
            <div className="bg-gray-50 min-h-screen pt-20 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-serif text-center text-primary mb-12">
                        ¿Cómo te gustaría continuar?
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {/* Option 1: Login/Register */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                                <User size={32} />
                            </div>
                            <h2 className="text-xl font-medium text-primary mb-4">Ya tengo cuenta</h2>
                            <p className="text-gray-500 mb-8 text-sm">
                                Inicia sesión para usar tus direcciones guardadas y acumular puntos.
                            </p>
                            <div className="space-y-3 w-full">
                                <Link href="/login?redirect=/checkout">
                                    <Button className="w-full bg-primary text-white">
                                        Iniciar Sesión
                                    </Button>
                                </Link>
                                <Link href="/register?redirect=/checkout">
                                    <Button variant="outline" className="w-full">
                                        Crear Cuenta
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Option 2: Guest */}
                        <div className="bg-[#F2EFE9] p-8 rounded-3xl shadow-sm border border-[#E6E0D9] flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#2c4a52] mb-6">
                                <Truck size={32} />
                            </div>
                            <h2 className="text-xl font-medium text-[#2c4a52] mb-4">Invitado</h2>
                            <p className="text-[#2c4a52]/70 mb-8 text-sm">
                                No necesitas cuenta. Podrás crear una al final si lo deseas.
                            </p>
                            <Button
                                onClick={() => setIsGuest(true)}
                                className="w-full bg-[#2c4a52] text-white hover:bg-[#1e343a] mt-auto"
                            >
                                Continuar como Invitado
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-0 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-7 space-y-8">

                        <form action={dispatch} id="checkout-form" className="space-y-8">
                            <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

                            {/* Section 1: Contact */}
                            <div className="bg-white p-8 mt-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
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
                                        defaultValue={user?.email || ''}
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
                                        <Input
                                            label="Nombre(s)"
                                            name="firstName"
                                            placeholder="Ana"
                                            defaultValue={user?.firstName || ''}
                                            required
                                            fullWidth
                                        />
                                        <Input
                                            label="Apellidos"
                                            name="lastName"
                                            placeholder="García"
                                            defaultValue={user?.lastName || ''}
                                            required
                                            fullWidth
                                        />
                                    </div>
                                    <Input label="Calle y Número" name="address" placeholder="Av. Reforma 222, Depto 401" required fullWidth />

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                        <Input label="Ciudad" name="city" placeholder="CDMX" required fullWidth />
                                        <Input label="Estado" name="state" placeholder="CDMX" required fullWidth />
                                        <Input label="C.P." name="postalCode" placeholder="06600" required fullWidth />
                                    </div>
                                    <Input
                                        label="Teléfono Celular"
                                        name="phone"
                                        placeholder="55 1234 5678"
                                        defaultValue={user?.phone || ''}
                                        required
                                        fullWidth
                                    />
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
                        <div className="bg-[#F2EFE9] text-[#2c4a52] p-8 md:p-10 rounded-3xl sticky top-28 shadow-sm border border-[#E6E0D9] relative overflow-hidden">

                            <h2 className="text-2xl font-serif mb-8 flex items-center gap-2 border-b border-[#E6E0D9] pb-4">
                                <ShoppingBag size={24} className="text-[#2c4a52]" />
                                Resumen de Orden
                            </h2>

                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center border-b border-[#E6E0D9] last:border-0 pb-4 last:pb-0">
                                        <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 relative border border-[#E6E0D9]">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">IMG</div>
                                            )}
                                            <div className="absolute top-0 right-0 bg-[#2c4a52] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-bl-lg">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm leading-tight mb-1 text-[#2c4a52]">{item.name}</h4>
                                            <p className="text-[#2c4a52]/80 text-sm">${item.price.toLocaleString('es-MX')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#E6E0D9] pt-6 space-y-3">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span>${(subtotal / 1.16).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>IVA (16%)</span>
                                    <span>${(subtotal - (subtotal / 1.16)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span className="flex items-center gap-2">
                                        <Truck size={14} /> Envío
                                    </span>
                                    <span>
                                        {shippingCost === 0 ? <span className="text-[#2c4a52] font-bold">Gratis</span> : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="border-t border-[#E6E0D9] pt-4 mt-4 flex justify-between items-end">
                                    <span className="text-lg font-medium">Total</span>
                                    <span className="text-3xl font-medium text-[#2c4a52]">
                                        ${total.toLocaleString('es-MX')}
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full mt-8 bg-[#2c4a52] hover:bg-[#1e343a] text-white font-bold h-16 text-lg transition-all shadow-none rounded-xl"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Confirmar Compra <ArrowRight size={20} />
                                </span>
                            </Button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <ShieldCheck size={12} />
                                <span>Garantía de Satisfacción YUTNÜÜ</span>
                            </div>


                            <div className="flex items-center justify-center mt-2 gap-2 text-primary/60">
                                <Lock size={12} />
                                <span className="text-xs font-medium uppercase tracking-widest">Checkout Seguro SSL 256-bit</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
