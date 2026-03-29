'use client';

import { useCart } from '@/lib/cart/CartContext';
import { createOrder } from '@/app/actions/createOrder';
import { getUserAddressesAction } from '@/app/actions/address-actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useActionState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/auth-context';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, subtotal } = useCart();
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [state, dispatch, isPending] = useActionState(createOrder, { message: '', errors: {} });
    const [isGuest, setIsGuest] = useState(false);

    const [addresses, setAddresses] = useState<any[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>('new');

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (user?.email) {
            setFormValues(prev => ({
                ...prev,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                email: user.email || ''
            }));

            getUserAddressesAction(user.email).then(res => {
                if (res.success && res.addresses && res.addresses.length > 0) {
                    setAddresses(res.addresses);
                    const def = res.addresses.find((a: any) => a.isDefault) || res.addresses[0];
                    selectAddress(def);
                }
                setLoadingAddresses(false);
            });
        } else {
            setLoadingAddresses(false);
        }
    }, [user]);

    const selectAddress = (addr: any) => {
        setSelectedAddressId(addr.id);
        setFormValues(prev => ({
            ...prev,
            firstName: addr.firstName,
            lastName: addr.lastName,
            address: addr.address1,
            city: addr.city,
            state: addr.state,
            postalCode: addr.postalCode,
            phone: addr.phone
        }));
    };

    const handleNewAddress = () => {
        setSelectedAddressId('new');
        setFormValues({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            phone: user?.phone || '',
            email: user?.email || ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!isLoading && items.length === 0) {
            router.push('/carrito');
        }
    }, [items, router, isLoading]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-text-secondary text-sm">Cargando...</div>;
    if (items.length === 0) return null;

    const shippingCost = subtotal > 1300 ? 0 : 150;
    const total = subtotal + shippingCost;

    // Auth choice
    if (!isAuthenticated && !isGuest) {
        return (
            <div className="min-h-screen py-20 px-4 bg-cream">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">Checkout</span>
                        <h1 className="text-3xl md:text-4xl font-serif">Como deseas continuar?</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-8 flex flex-col">
                            <h2 className="text-lg font-medium mb-2">Ya tengo cuenta</h2>
                            <p className="text-sm text-text-secondary mb-6 flex-1">
                                Usa tus direcciones guardadas y revisa tu historial de pedidos.
                            </p>
                            <div className="space-y-2">
                                <Link href="/login?redirect=/checkout">
                                    <Button className="w-full h-11 text-sm tracking-wider uppercase">
                                        Iniciar Sesion
                                    </Button>
                                </Link>
                                <Link href="/registro?redirect=/checkout">
                                    <Button variant="outline" className="w-full h-11 text-sm tracking-wider uppercase">
                                        Crear Cuenta
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-primary text-white p-8 flex flex-col">
                            <h2 className="text-lg font-medium mb-2 text-white">Invitado</h2>
                            <p className="text-sm text-white/60 mb-6 flex-1">
                                No necesitas cuenta. Podras crear una al final si deseas.
                            </p>
                            <Button
                                onClick={() => setIsGuest(true)}
                                className="w-full h-11 text-sm tracking-wider uppercase bg-accent text-white hover:bg-accent-dark border-0"
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
        <div className="min-h-screen bg-cream pb-20">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="pt-10 pb-6 mb-8 border-b border-gray-200">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-2">Checkout</span>
                    <h1 className="text-2xl md:text-3xl font-serif">Finalizar Compra</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

                    {/* Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <form action={dispatch} id="checkout-form" className="space-y-6">
                            <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

                            {/* Contact */}
                            <div className="bg-white p-6 md:p-8">
                                <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-6">Contacto</h2>
                                <Input
                                    label="Correo Electronico"
                                    name="email"
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    error={state.errors?.email?.[0]}
                                />
                                <p className="text-xs text-text-light mt-3">Tu privacidad es importante. No compartimos tus datos.</p>
                            </div>

                            {/* Shipping */}
                            <div className="bg-white p-6 md:p-8">
                                <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-6">Direccion de Envio</h2>

                                {/* Saved addresses */}
                                {!loadingAddresses && addresses.length > 0 && (
                                    <div className="mb-6 space-y-2">
                                        {addresses.map((addr: any) => (
                                            <div
                                                key={addr.id}
                                                onClick={() => selectAddress(addr)}
                                                className={`p-4 border cursor-pointer transition-colors ${selectedAddressId === addr.id
                                                    ? 'border-primary bg-cream'
                                                    : 'border-gray-100 hover:border-gray-200'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-sm font-medium">
                                                        {addr.firstName} {addr.lastName}
                                                    </span>
                                                    {addr.isDefault && <span className="text-[10px] text-text-light uppercase tracking-wider">Default</span>}
                                                </div>
                                                <p className="text-xs text-text-secondary">
                                                    {addr.address1}, {addr.city}, {addr.state}, {addr.postalCode}
                                                </p>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleNewAddress}
                                            className={`w-full p-4 border border-dashed text-center text-sm transition-colors ${selectedAddressId === 'new'
                                                ? 'border-primary bg-cream text-primary'
                                                : 'border-gray-200 text-text-light hover:border-primary hover:text-primary'
                                                }`}
                                        >
                                            + Nueva Direccion
                                        </button>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input label="Nombre(s)" name="firstName" placeholder="Ana" value={formValues.firstName} onChange={handleInputChange} required fullWidth error={state.errors?.firstName?.[0]} />
                                        <Input label="Apellidos" name="lastName" placeholder="Garcia" value={formValues.lastName} onChange={handleInputChange} required fullWidth error={state.errors?.lastName?.[0]} />
                                    </div>
                                    <Input label="Calle y Numero" name="address" placeholder="Av. Reforma 222, Depto 401" value={formValues.address} onChange={handleInputChange} required fullWidth error={state.errors?.address?.[0]} />
                                    <div className="grid grid-cols-3 gap-4">
                                        <Input label="Ciudad" name="city" placeholder="CDMX" value={formValues.city} onChange={handleInputChange} required fullWidth error={state.errors?.city?.[0]} />
                                        <Input label="Estado" name="state" placeholder="CDMX" value={formValues.state} onChange={handleInputChange} required fullWidth error={state.errors?.state?.[0]} />
                                        <Input label="C.P." name="postalCode" placeholder="06600" value={formValues.postalCode} onChange={handleInputChange} required fullWidth error={state.errors?.postalCode?.[0]} />
                                    </div>
                                    <Input label="Telefono" name="phone" placeholder="55 1234 5678" value={formValues.phone} onChange={handleInputChange} required fullWidth error={state.errors?.phone?.[0]} />
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white p-6 md:p-8">
                                <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-6">Metodo de Pago</h2>
                                <div className="p-4 border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-6 bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                            MP
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Mercado Pago</p>
                                            <p className="text-xs text-text-light">Tarjetas, Efectivo, Transferencia</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] tracking-wider uppercase text-blue-600 font-medium">Seguro</span>
                                </div>
                                <p className="text-xs text-text-light mt-3 text-center">
                                    Seras redirigido a Mercado Pago para completar tu compra.
                                </p>
                            </div>

                            {state.message && (
                                <div className="bg-red-50 text-red-600 p-4 text-center text-sm">
                                    {state.message}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 md:p-8 sticky top-28">
                            <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-6">Resumen de Orden</h2>

                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="w-14 h-14 bg-cream flex-shrink-0 relative overflow-hidden">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-text-light">Foto</div>
                                            )}
                                            <div className="absolute top-0 right-0 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium truncate">{item.name}</h4>
                                            <p className="text-xs text-text-secondary">${item.price.toLocaleString('es-MX')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>Subtotal</span>
                                    <span>${(subtotal / 1.16).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>IVA (16%)</span>
                                    <span>${(subtotal - (subtotal / 1.16)).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>Envio</span>
                                    <span>{shippingCost === 0 ? <span className="text-accent font-medium">Gratis</span> : `$${shippingCost.toFixed(2)}`}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                                    <span className="text-sm font-medium">Total</span>
                                    <span className="text-2xl font-serif">${total.toLocaleString('es-MX')}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                disabled={isPending}
                                className="w-full mt-6 h-13 text-sm tracking-wider uppercase disabled:opacity-50"
                            >
                                {isPending ? 'Procesando...' : 'Confirmar Compra'}
                            </Button>

                            <p className="text-[10px] text-text-light text-center mt-4 tracking-wider uppercase">
                                Checkout seguro — Garantia Punto Gema Nova
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
