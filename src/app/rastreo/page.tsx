'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { trackOrderAction, getUserOrdersAction } from '@/app/actions/order-actions';
import { Search, Package, ArrowRight, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const OrderStatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
        PROCESSING: 'bg-purple-100 text-purple-800 border-purple-200',
        SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        DELIVERED: 'bg-green-100 text-green-800 border-green-200',
        CANCELLED: 'bg-red-100 text-red-800 border-red-200',
        REFUNDED: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const labels: Record<string, string> = {
        PENDING: 'Pendiente',
        CONFIRMED: 'Confirmado',
        PROCESSING: 'En Preparación',
        SHIPPED: 'En Camino',
        DELIVERED: 'Entregado',
        CANCELLED: 'Cancelado',
        REFUNDED: 'Reembolsado',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {labels[status] || status}
        </span>
    );
};

export default function TrackingPage() {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Guest Form State
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [trackError, setTrackError] = useState('');
    const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

    // User Orders State
    const [userOrders, setUserOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    // Initial Fetch for logged in users
    useEffect(() => {
        if (isAuthenticated && user?.email) {
            fetchUserOrders(user.email);
        }
    }, [isAuthenticated, user]);

    const fetchUserOrders = async (userEmail: string) => {
        setLoadingOrders(true);
        const { success, orders } = await getUserOrdersAction(userEmail);
        if (success) {
            setUserOrders(orders || []);
        }
        setLoadingOrders(false);
    };

    const handleTrackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsTracking(true);
        setTrackError('');
        setTrackedOrder(null);

        if (!orderNumber || !email) {
            setTrackError('Por favor ingresa el número de orden y tu email.');
            setIsTracking(false);
            return;
        }

        const { success, order, error } = await trackOrderAction(orderNumber, email);

        if (success && order) {
            setTrackedOrder(order);
        } else {
            setTrackError(error || 'No pudimos encontrar tu orden. Verifica los datos.');
        }
        setIsTracking(false);
    };

    // Render Order Detail Card
    const OrderCard = ({ order }: { order: any }) => (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-50 pb-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-xl text-primary">Orden #{order.orderNumber}</h3>
                        <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-gray-500">
                        Realizada el {new Date(order.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                {order.trackingNumber && (
                    <div className="text-right">
                        <p className="text-xs text-uppercase text-gray-400 font-bold tracking-widest">Guía de Rastreo</p>
                        <p className="font-mono text-primary">{order.trackingNumber}</p>
                    </div>
                )}
            </div>

            {/* Items Preview */}
            <div className="space-y-4 mb-6">
                {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg relative overflow-hidden flex-shrink-0 border border-gray-100">
                            {item.product?.images?.[0] ? (
                                <Image
                                    src={item.product.images[0]}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Package size={20} />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-text-primary text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">Cant: {item.quantity} • ${Number(item.price || 0).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Timeline / Status Info */}
            <div className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                {order.status === 'DELIVERED' ? (
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                ) : order.status === 'SHIPPED' ? (
                    <Truck className="text-blue-600 mt-1" size={20} />
                ) : (
                    <Clock className="text-yellow-600 mt-1" size={20} />
                )}
                <div>
                    <h4 className="font-medium text-text-primary text-sm">Estado del Envío</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        {order.status === 'PENDING' && 'Estamos procesando tu pago.'}
                        {order.status === 'CONFIRMED' && 'Hemos recibido tu orden y la estamos preparando.'}
                        {order.status === 'PROCESSING' && 'Tu paquete está siendo empacado con cuidado.'}
                        {order.status === 'SHIPPED' && '¡Tu paquete va en camino!'}
                        {order.status === 'DELIVERED' && 'Paquete entregado exitosamente.'}
                        {order.status === 'CANCELLED' && 'Esta orden fue cancelada.'}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <p className="text-sm font-medium text-primary">Total: ${order.total.toFixed(2)}</p>
                {order.trackingNumber && (
                    <Button variant="outline" className="text-xs py-2 h-auto" onClick={() => window.open(`https://www.google.com/search?q=${order.trackingNumber}`, '_blank')}>
                        Rastrear Paquete
                    </Button>
                )}
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-12 pb-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">
                        Yutnüu Logistics
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                        Seguimiento de Envíos
                    </h1>
                    <p className="text-gray-500 font-light max-w-lg mx-auto">
                        Mantente informado sobre el estado de tu compra en cada paso del camino.
                    </p>
                </div>

                {isAuthenticated ? (
                    // Authenticated View
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main History */}
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-2xl font-serif text-primary border-b border-gray-100 pb-4">
                                Hola, {user?.firstName || 'Usuario'}
                            </h2>

                            {loadingOrders ? (
                                <div className="space-y-4">
                                    {[1, 2].map(i => <div key={i} className="h-40 bg-gray-50 rounded-2xl animate-pulse" />)}
                                </div>
                            ) : userOrders.length > 0 ? (
                                <div className="space-y-6">
                                    {userOrders.map(order => (
                                        <OrderCard key={order.id} order={order} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">No tienes pedidos recientes</h3>
                                    <p className="text-gray-500 mb-6">Aún no has realizado ninguna compra con nosotros.</p>
                                    <Link href="/tienda">
                                        <Button>Ir a la Tienda</Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: Track Another */}
                        <div className="lg:col-span-1">
                            <div className="bg-cream-light p-8 rounded-3xl sticky top-24">
                                <h3 className="text-xl font-serif text-primary mb-6">¿Rastrear otra orden?</h3>
                                <form onSubmit={handleTrackSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Número de Orden</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                placeholder="Ej. ORD-123456"
                                                className="w-full bg-white border-none rounded-xl py-3 pl-10 pr-4 shadow-sm focus:ring-1 focus:ring-primary"
                                                value={orderNumber}
                                                onChange={(e) => setOrderNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email de Compra</label>
                                        <input
                                            type="email"
                                            placeholder="tucorreo@ejemplo.com"
                                            className="w-full bg-white border-none rounded-xl py-3 px-4 shadow-sm focus:ring-1 focus:ring-primary"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <Button className="w-full" isLoading={isTracking}>
                                        Buscar Orden
                                    </Button>

                                    {trackError && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
                                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                            {trackError}
                                        </div>
                                    )}
                                </form>

                                {trackedOrder && (
                                    <div className="mt-8 border-t border-gray-200 pt-6 animate-fade-in">
                                        <h4 className="font-bold text-primary mb-2 text-sm">Resultado:</h4>
                                        <div className="bg-white p-4 rounded-xl shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-primary">#{trackedOrder.orderNumber}</span>
                                                <OrderStatusBadge status={trackedOrder.status} />
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">
                                                {trackedOrder.items.length} productos • ${trackedOrder.total.toFixed(2)}
                                            </p>
                                            {trackedOrder.trackingNumber && (
                                                <p className="text-xs font-mono bg-gray-100 p-1 rounded text-center my-2 select-all">
                                                    {trackedOrder.trackingNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Guest View
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto items-center">

                        {/* Option 1: Login */}
                        <div className="order-2 md:order-1 bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100">
                            <h3 className="text-2xl font-serif text-primary mb-4">¿Tienes una cuenta?</h3>
                            <p className="text-gray-600 mb-8 font-light leading-relaxed">
                                Inicia sesión para ver tu historial completo de pedidos, descargar facturas y gestionar tus direcciones.
                            </p>
                            <Link href="/login?redirect=/rastreo">
                                <Button variant="outline" className="w-full max-w-xs border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                                    Iniciar Sesión
                                </Button>
                            </Link>
                        </div>

                        {/* Option 2: Guest Track */}
                        <div className="order-1 md:order-2">
                            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

                                <h3 className="text-2xl font-serif text-primary mb-6 flex items-center gap-3">
                                    <Search size={24} className="text-accent" />
                                    Rastreo Rápido
                                </h3>

                                <form onSubmit={handleTrackSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Número de Orden</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="ORD-..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            value={orderNumber}
                                            onChange={(e) => setOrderNumber(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="tucorreo@ejemplo.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <p className="text-xs text-gray-400 mt-2">Debe coincidir con el email de compra.</p>
                                    </div>

                                    <Button className="w-full py-4 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5" isLoading={isTracking}>
                                        Ver Estado del Envío
                                    </Button>

                                    {trackError && (
                                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-start gap-3 animate-fade-in">
                                            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                                            <span>{trackError}</span>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Result Modal / Expand for Guest */}
                            {trackedOrder && !isAuthenticated && (
                                <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-lg animate-scale-in">
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                                        <h4 className="font-bold text-lg text-primary">Orden #{trackedOrder.orderNumber}</h4>
                                        <div onClick={() => setTrackedOrder(null)} className="cursor-pointer text-gray-400 hover:text-red-500">
                                            Cerrar
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                            <span className="text-gray-600">Estado:</span>
                                            <OrderStatusBadge status={trackedOrder.status} />
                                        </div>
                                        {trackedOrder.trackingNumber && (
                                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Guía de Rastreo</p>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-lg font-mono text-blue-900">{trackedOrder.trackingNumber}</code>
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium mb-2">Productos:</p>
                                            <ul className="space-y-2">
                                                {trackedOrder.items.map((item: any, i: number) => (
                                                    <li key={i} className="text-sm text-gray-600 flex justify-between">
                                                        <span>{item.quantity}x {item.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
