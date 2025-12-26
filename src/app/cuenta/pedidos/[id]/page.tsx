'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getOrderDetailsAction } from '@/app/actions/order-actions';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Detailed Order Type
interface OrderDetail {
    id: string;
    orderNumber: string;
    createdAt: Date;
    status: string;
    total: number;
    subtotal: number;
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

    const date = new Date(order.createdAt).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div>
            {/* Header / Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-text-secondary">
                <Link href="/cuenta/pedidos" className="hover:text-primary">Mis Pedidos</Link>
                <span>/</span>
                <span className="text-text-primary font-medium">#{order.orderNumber}</span>
            </div>

            {/* Title & Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-2xl font-serif text-text-primary mb-1">Pedido #{order.orderNumber}</h1>
                    <p className="text-sm text-text-secondary">{date}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-text-secondary">Estado:</span>
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                        }`}>
                        {order.status === 'PENDING' ? 'Pendiente' : order.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-lg font-medium text-text-primary">Productos</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex-shrink-0 overflow-hidden relative">
                                    {/* Placeholder for real image or next/image */}
                                    {item.product.images[0] ? (
                                        <img src={item.product.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-text-primary mb-1">{item.name}</h4>
                                    <p className="text-sm text-text-secondary">Cantidad: {item.quantity}</p>
                                    <p className="text-sm font-medium text-primary mt-1">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    {/* Summary */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="text-lg font-medium text-text-primary mb-4">Resumen</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-text-secondary">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-text-secondary">
                                <span>Envío</span>
                                <span>${order.shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-medium text-lg text-text-primary">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="p-6 bg-white rounded-xl border border-gray-100">
                        <h3 className="text-lg font-medium text-text-primary mb-4">Dirección de Envío</h3>
                        {order.shippingAddress ? (
                            <div className="text-sm text-text-secondary space-y-1">
                                <p className="font-medium text-text-primary">
                                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                </p>
                                <p>{order.shippingAddress.address1}</p>
                                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">Sin dirección registrada.</p>
                        )}
                    </div>

                    {/* Support */}
                    <div className="text-center">
                        <Link href="/faq" className="text-sm text-primary hover:underline">
                            ¿Necesitas ayuda con este pedido?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
