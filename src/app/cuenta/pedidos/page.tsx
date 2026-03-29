'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getUserOrdersAction } from '@/app/actions/order-actions';
import Link from 'next/link';
import { Package, Clock, ArrowRight, ShoppingBag } from 'lucide-react';

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
                }
            }
            setIsLoading(false);
        };

        fetchOrders();
    }, [user]);

    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-gray-100 rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="w-16 h-16 bg-[#F2EFE9] rounded-full flex items-center justify-center mb-4 text-[#1a1a1a]">
                    <Package size={32} />
                </div>
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Aún no tienes pedidos</h2>
                <p className="text-gray-500 mb-6 max-w-sm text-sm">
                    Explora nuestros productos y crea tu primera piezas de joyería artesanal.
                </p>
                <Link
                    href="/tienda"
                    className="bg-[#1a1a1a] hover:bg-[#000000] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                    <ShoppingBag size={16} />
                    Ir a la Tienda
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                <Package size={20} className="text-[#1a1a1a]" />
                <h1 className="text-xl font-bold text-[#1a1a1a] uppercase tracking-wider">Mis Pedidos</h1>
            </div>

            <div className="space-y-4">
                {orders.map((order) => {
                    const date = new Date(order.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    return (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-[#1a1a1a] text-sm">#{order.orderNumber}</span>
                                        <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-wider border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' :
                                            order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {order.status === 'PENDING' ? 'Pendiente' : order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Clock size={12} />
                                        {date}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {order.items.length > 0 ? (
                                            <span className="line-clamp-1">{order.items[0].name} {order.items.length > 1 && `+ ${order.items.length - 1} más`}</span>
                                        ) : (
                                            'Productos'
                                        )}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-between md:justify-end gap-4 md:gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto">
                                    <p className="font-bold text-lg text-[#1a1a1a]">
                                        ${order.total.toFixed(2)}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        {order.status !== 'CANCELLED' && order.status !== 'PENDING' && (
                                            <Link
                                                href={`/facturacion?orderId=${order.orderNumber}&amount=${order.total}`}
                                                className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#d4af37] transition-colors border-r border-gray-200 pr-3"
                                                title="Solicitar Factura"
                                            >
                                                Facturar
                                            </Link>
                                        )}
                                        <Link
                                            href={`/cuenta/pedidos/${order.id}`}
                                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#3d3d3d] transition-colors group-hover:underline decoration-1 underline-offset-4"
                                        >
                                            Ver Detalles
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
