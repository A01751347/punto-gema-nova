'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getOrderDetailsAction } from '@/app/actions/order-actions';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, MapPin, Package, CreditCard, ChevronLeft, HelpCircle } from 'lucide-react';

// Detailed Order Type
interface OrderDetail {
    id: string;
    orderNumber: string;
    createdAt: Date;
    status: string;
    total: number;
    subtotal: number;
    tax?: number;
    shippingCost: number;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
        product: {
            images: string[];
            slug: string;
        };
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        address1: string;
        address2: string | null;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    } | null;
}

export default function OrderDetailPage() {
    const params = useParams();
    const { user } = useAuth();
    const router = useRouter();

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (user?.email && params.id) {
                const { success, order, error } = await getOrderDetailsAction(params.id as string, user.email);

                if (success && order) {
                    setOrder(order as unknown as OrderDetail);
                } else {
                    setError(error || 'No se pudo cargar el pedido.');
                }
            }
            setIsLoading(false);
        };

        fetchOrder();
    }, [user, params.id]);

    if (isLoading) {
        return <div className="p-8 text-center text-gray-400">Cargando pedido...</div>;
    }

    if (error || !order) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 mb-4">{error || 'Pedido no encontrado'}</p>
                <Link href="/cuenta/pedidos" className="text-primary hover:underline">
                    &larr; Volver a mis pedidos
                </Link>
            </div>
        );
    }

    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link href="/cuenta/pedidos" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1a1a1a] transition-colors mb-4">
                    <ChevronLeft size={16} className="mr-1" /> Volver a mis pedidos
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-[#1a1a1a]">Pedido #{order.orderNumber}</h1>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                        <span className={`px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' :
                            order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}>
                            {order.status === 'PENDING' ? 'Pendiente' : order.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                            <Package size={14} className="text-[#1a1a1a]" />
                            <h3 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider">Productos</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50/30 transition-colors">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex-shrink-0 overflow-hidden relative">
                                        {item.product.images[0] ? (
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <Package size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 py-0.5">
                                        <h4 className="font-medium text-[#1a1a1a] text-sm truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="py-0.5 text-right">
                                        <p className="font-medium text-[#1a1a1a] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                        <p className="text-[10px] text-gray-400">${item.price.toFixed(2)} c/u</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3 text-[#1a1a1a]">
                                <MapPin size={14} />
                                <h3 className="font-bold text-xs uppercase tracking-wider">Dirección de Envío</h3>
                            </div>
                            {order.shippingAddress ? (
                                <div className="text-sm text-gray-600 pl-6 space-y-0.5">
                                    <p className="font-medium text-[#1a1a1a]">
                                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                    </p>
                                    <p className="text-xs">{order.shippingAddress.address1}</p>
                                    {order.shippingAddress.address2 && <p className="text-xs">{order.shippingAddress.address2}</p>}
                                    <p className="text-xs">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{order.shippingAddress.country}</p>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 pl-6">No disponible</p>
                            )}
                        </div>
                        <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                            <div className="flex items-center gap-2 mb-3 text-[#1a1a1a]">
                                <Truck size={14} />
                                <h3 className="font-bold text-xs uppercase tracking-wider">Método de Envío</h3>
                            </div>
                            <div className="pl-6 text-sm text-gray-600">
                                <p className="text-xs font-medium">Estándar</p>
                                <p className="text-[10px] text-gray-400">Entrega estimada: 3-5 días hábiles</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary */}
                <div className="space-y-6">
                    <div className="bg-[#F2EFE9] rounded-xl border border-[#E6E0D9] p-5 shadow-sm sticky top-24">
                        <h3 className="font-medium text-[#1a1a1a] mb-4 pb-3 border-b border-[#E6E0D9]">Resumen</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span>{order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost.toFixed(2)}`}</span>
                            </div>
                            {/* If tax is tracked separately */}
                            <div className="flex justify-between text-gray-600 text-xs">
                                <span>IVA (Incluido 16%)</span>
                                <span>${(order.total - (order.total / 1.16)).toFixed(2)}</span>
                            </div>

                            <div className="border-t border-[#E6E0D9] pt-3 mt-2 flex justify-between items-end">
                                <span className="font-medium text-[#1a1a1a]">Total</span>
                                <span className="font-bold text-lg text-[#1a1a1a]">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#E6E0D9] flex items-center justify-center gap-2 text-xs text-[#1a1a1a]/60">
                            <CreditCard size={12} />
                            <span>Pago Digital Seguro</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="/faq" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#1a1a1a] transition-colors">
                            <HelpCircle size={12} /> ¿Ayuda con tu pedido?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
