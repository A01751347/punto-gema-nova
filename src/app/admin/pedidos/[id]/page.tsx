'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminOrderDetailsAction } from '@/app/actions/admin/admin-order-details';
import { updateOrderStatusAction } from '@/app/actions/admin/admin-actions';
import Link from 'next/link';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const { user } = useAuth();
    const router = useRouter();

    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const loadOrder = async () => {
        if (user?.email && params.id) {
            const { success, order, error } = await getAdminOrderDetailsAction(user.email, params.id as string);
            if (success) {
                setOrder(order);
            } else {
                setError(error || 'Failed to load order');
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadOrder();
    }, [user, params.id]);

    const handleStatusChange = async (newStatus: string) => {
        if (!user?.email || !order) return;
        setIsUpdating(true);
        const { success } = await updateOrderStatusAction(user.email, order.id, newStatus);
        if (success) {
            setOrder({ ...order, status: newStatus });
        } else {
            alert('Error updating status');
        }
        setIsUpdating(false);
    };

    if (isLoading) return <div className="p-8 text-gray-400">Cargando detalles...</div>;
    if (error || !order) return <div className="p-8 text-red-500">Error: {error}</div>;

    const date = new Date(order.createdAt).toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <Link href="/admin/pedidos" className="hover:text-primary">Pedidos</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">#{order.orderNumber}</span>
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-serif text-gray-900 mb-1">Pedido #{order.orderNumber}</h1>
                    <p className="text-gray-500 text-sm mb-4">Realizado el {date}</p>

                    {/* Customer Info Mini-Card */}
                    <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {order.user?.firstName?.[0] || '?'}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-blue-900">
                                {order.user?.firstName} {order.user?.lastName}
                            </div>
                            <div className="text-xs text-blue-700">{order.user?.email || order.guestEmail}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Estado del Pedido</label>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={isUpdating}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm
                            ${order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-800' :
                                order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-800' :
                                    order.status === 'DELIVERED' ? 'bg-green-50 text-green-800' : ''
                            }`}
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-medium text-gray-900">Productos ({order.items.length})</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-4 flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                        {item.product.images[0] ? (
                                            <img src={item.product.images[0]} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No img</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{item.name}</div>
                                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                    </div>
                                    <div className="text-right font-medium text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Notas y Comentarios</h3>
                        <div className="text-sm text-gray-500 italic">
                            {order.customerNotes || "Sin notas del cliente."}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Resumen Financiero</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Envío</span>
                                <span>${order.shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Impuestos</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Dirección de Envío</h3>
                        {order.shippingAddress ? (
                            <div className="text-sm text-gray-600 space-y-1">
                                <p className="font-medium text-gray-900">
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
                </div>
            </div>
        </div>
    );
}
