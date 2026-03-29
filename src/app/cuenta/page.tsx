'use client';

import { useAuth } from '@/lib/auth/auth-context';
import Link from 'next/link';
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
                if (res.success && res.orders) setOrders(res.orders);
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
            <div className="mb-8">
                <span className="text-xs tracking-[0.2em] uppercase text-accent block mb-2">Bienvenida</span>
                <h1 className="text-2xl font-serif mb-2">
                    Hola, {user?.firstName || 'Usuario'}
                </h1>
                <p className="text-sm text-text-secondary">
                    Desde aqui puedes ver tus pedidos, direcciones y detalles de cuenta.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                        <h2 className="text-xs tracking-[0.15em] uppercase text-text-light">Pedidos Recientes</h2>
                        <Link href="/cuenta/pedidos" className="text-xs text-text-light hover:text-primary transition-colors">
                            Ver todos
                        </Link>
                    </div>

                    {loadingOrders ? (
                        <div className="space-y-3">
                            <div className="h-10 bg-gray-50 animate-pulse" />
                            <div className="h-10 bg-gray-50 animate-pulse" />
                        </div>
                    ) : orders.length > 0 ? (
                        <div className="space-y-0">
                            {orders.slice(0, 3).map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/cuenta/pedidos/${order.id}`}
                                    className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-cream/30 -mx-2 px-2 transition-colors"
                                >
                                    <div>
                                        <p className="text-sm font-medium">#{order.orderNumber}</p>
                                        <p className="text-xs text-text-light mt-0.5">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-wider ${order.status === 'DELIVERED' ? 'text-green-600' :
                                        order.status === 'SHIPPED' ? 'text-blue-600' :
                                            order.status === 'CANCELLED' ? 'text-red-500' :
                                                'text-yellow-600'
                                        }`}>
                                        {order.status === 'PENDING' ? 'Pendiente' : order.status}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-sm text-text-light mb-3">No tienes pedidos.</p>
                            <Link href="/tienda" className="text-xs text-accent hover:text-accent-dark border-b border-accent/30 pb-0.5">
                                Ir a la tienda
                            </Link>
                        </div>
                    )}
                </div>

                {/* Account Details */}
                <div className="bg-white border border-gray-100 p-6 h-fit">
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                        <h2 className="text-xs tracking-[0.15em] uppercase text-text-light">Detalles de Cuenta</h2>
                        <Link href="/cuenta/perfil" className="text-xs text-text-light hover:text-primary transition-colors">
                            Editar
                        </Link>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-text-light mb-1">Nombre</p>
                            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-text-light mb-1">Email</p>
                            <p className="text-sm text-text-secondary">{user?.email}</p>
                        </div>
                        {user?.phone && (
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-text-light mb-1">Telefono</p>
                                <p className="text-sm text-text-secondary">{user.phone}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
