'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getUserOrdersAction } from '@/app/actions/order-actions';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Define minimal type for order list
interface OrderPreview {
    id: string;
    orderNumber: string;
    createdAt: Date;
    total: number;
    status: string;
    items: { name: string }[];
}

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<OrderPreview[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.email) {
                const { success, orders } = await getUserOrdersAction(user.email);
                if (success && orders) {
                    setOrders(orders as unknown as OrderPreview[]);
                    // Note: Date objects from server actions might be strings if passed directly, 
                    // but Prisma returns Date objects. Next.js serialization might convert them.
                    // We'll handle date formatting safely.
                }
            }
            setIsLoading(false);
        };

        fetchOrders();
    }, [user]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-50 rounded-xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-xl font-serif text-text-primary mb-2">Aún no tienes pedidos</h2>
                <p className="text-text-secondary mb-6 max-w-sm">
                    Explora nuestros productos y crea tu primera rutina de cuidado de la piel.
                </p>
                <Link href="/tienda">
                    <Button>Ir a la Tienda</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-serif text-text-primary mb-6">Mis Pedidos</h1>
            <div className="space-y-4">
                {orders.map((order) => {
                    const date = new Date(order.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    return (
                        <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-soft transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-sm text-text-secondary">#{order.orderNumber}</span>
                                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status === 'PENDING' ? 'Pendiente' : order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-secondary mb-1">
                                        {date}
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        {order.items.length > 0 ? order.items[0].name : 'Productos'}
                                        {/* Simplified item preview logic */}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6">
                                    <p className="font-medium text-lg">
                                        ${order.total.toFixed(2)}
                                    </p>
                                    <Link href={`/cuenta/pedidos/${order.id}`}>
                                        <Button variant="outline" size="sm">
                                            Ver Detalles
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
