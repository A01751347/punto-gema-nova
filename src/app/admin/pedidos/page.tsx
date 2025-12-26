'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAllOrdersAction, updateOrderStatusAction } from '@/app/actions/admin/admin-actions';
import Link from 'next/link';

export default function AdminOrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadOrders = async () => {
        if (user?.email) {
            const { success, orders } = await getAllOrdersAction(user.email);
            if (success) setOrders(orders);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadOrders();
    }, [user]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        if (!user?.email) return;

        // Optimistic update
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        const { success } = await updateOrderStatusAction(user.email, orderId, newStatus);
        if (!success) {
            // Revert on failure
            loadOrders();
            alert('Error updating status');
        }
    };

    if (isLoading) return <div className="p-8 text-gray-400">Cargando pedidos...</div>;

    return (
        <div>
            <h1 className="text-2xl font-serif text-gray-800 mb-6">Gestión de Pedidos</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="px-6 py-4">Pedido #</th>
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{order.orderNumber}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">
                                            {order.user?.firstName} {order.user?.lastName}
                                        </div>
                                        <div className="text-xs text-gray-500">{order.user?.email || order.guestEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`text-xs rounded-full px-2 py-1 font-medium border-0 cursor-pointer focus:ring-2 focus:ring-primary ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="CONFIRMED">CONFIRMED</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/pedidos/${order.id}`} className="text-primary hover:underline">Ver Detalle</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No se encontraron pedidos.</div>
                )}
            </div>
        </div>
    );
}
