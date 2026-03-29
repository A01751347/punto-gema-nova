'use client';

import { useAuth } from '@/lib/auth/auth-context';
import Link from 'next/link';
import { Package, User, ChevronRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserOrdersAction } from '@/app/actions/order-actions';

export default function DashboardPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (user?.email) {
                const res = await getUserOrdersAction(user.email);
                if (res.success && res.orders) {
                    setOrders(res.orders);
                }
            }
            setLoadingOrders(false);
        }
        fetchOrders();
    }, [user]);

    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString('es-MX', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                    Hola, {user?.firstName || 'Usuario'}
                </h1>
                <p className="text-sm text-gray-500 max-w-2xl">
                    Desde tu panel de control puedes ver tus pedidos recientes, gestionar tus direcciones y editar tu contraseña y detalles de la cuenta.
                </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders Preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Package size={16} className="text-[#1a1a1a]" />
                            <h2 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">Pedidos Recientes</h2>
                        </div>
                        <Link href="/cuenta/pedidos" className="text-xs text-gray-500 hover:text-[#1a1a1a] transition-colors">
                            Ver todos
                        </Link>
                    </div>

                    <div className="flex-1">
                        {loadingOrders ? (
                            <div className="space-y-3">
                                <div className="h-10 bg-gray-50 rounded animate-pulse" />
                                <div className="h-10 bg-gray-50 rounded animate-pulse" />
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="space-y-3">
                                {orders.slice(0, 3).map((order) => (
                                    <Link
                                        key={order.id}
                                        href={`/cuenta/pedidos/${order.id}`}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1a1a] group-hover:text-primary-light">#{order.orderNumber}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                                <Clock size={10} />
                                                <span>{formatDate(order.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-wider border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                                                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                }`}>
                                                {order.status === 'PENDING' ? 'Pendiente' : order.status}
                                            </span>
                                            <ChevronRight size={14} className="text-gray-300 group-hover:text-[#1a1a1a]" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-gray-400 mb-4">No tienes pedidos recientes.</p>
                                <Link href="/tienda" className="inline-flex items-center px-4 py-2 bg-[#F2EFE9] text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E6E0D9] transition-colors">
                                    Ir a la tienda
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Details Preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-fit">
                    <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-[#1a1a1a]" />
                            <h2 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">Detalles de la Cuenta</h2>
                        </div>
                        <Link href="/cuenta/perfil" className="text-xs text-gray-500 hover:text-[#1a1a1a] transition-colors">
                            Editar
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Nombre</p>
                            <p className="text-[#1a1a1a] font-medium text-sm">{user?.firstName} {user?.lastName}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Email</p>
                            <p className="text-gray-600 text-sm">{user?.email}</p>
                        </div>
                        {user?.phone && (
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Teléfono</p>
                                <p className="text-gray-600 text-sm">{user.phone}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
