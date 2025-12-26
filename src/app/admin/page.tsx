'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminStatsAction } from '@/app/actions/admin/admin-actions';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (user?.email) {
                const { success, stats } = await getAdminStatsAction(user.email);
                if (success) {
                    setStats(stats);
                }
            }
            setIsLoading(false);
        };
        fetchStats();
    }, [user]);

    if (isLoading) {
        return <div className="text-gray-400">Cargando datos...</div>;
    }

    if (!stats) return null;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif text-gray-800">Panel de Control</h1>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Ingresos Totales</div>
                    <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Pedidos Totales</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Productos con Stock Bajo</div>
                    <div className="text-2xl font-bold text-red-600">{stats.lowStockCount}</div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Pedidos Recientes</h2>
                    <Link href="/admin/pedidos" className="text-sm text-primary hover:underline">
                        Ver todos
                    </Link>
                </div>
                <div className="divide-y divide-gray-100">
                    {stats.recentOrders.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">No hay pedidos recientes.</div>
                    ) : (
                        stats.recentOrders.map((order: any) => (
                            <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {order.user?.firstName} {order.user?.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">{order.user?.email || 'Invitado'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">${order.total.toFixed(2)}</div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
