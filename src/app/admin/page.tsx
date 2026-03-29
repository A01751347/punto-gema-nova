'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminStatsAction } from '@/app/actions/admin/admin-actions';
import Link from 'next/link';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { CheckCircle } from 'lucide-react';

const toCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
};

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('1m');

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            if (user?.email) {
                const { success, stats: fetchedStats } = await getAdminStatsAction(user.email, timeRange);
                if (success) setStats(fetchedStats);
            }
            setIsLoading(false);
        };
        fetchStats();
    }, [user, timeRange]);

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-sm text-text-secondary">Cargando tablero...</p>
            </div>
        );
    }

    if (!stats) return <div className="p-8 text-text-secondary">No se pudieron cargar las estadisticas.</div>;

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-accent block mb-2">Dashboard</span>
                    <h1 className="text-2xl md:text-3xl font-serif">Panel de Control</h1>
                </div>
                <select
                    className="border border-gray-200 text-sm text-text-secondary py-2 px-3 bg-white focus:outline-none focus:border-primary"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="1m">Ultimo mes</option>
                    <option value="3m">Ultimos 3 meses</option>
                    <option value="6m">Ultimos 6 meses</option>
                    <option value="1y">Ultimo ano</option>
                    <option value="all">Todo</option>
                </select>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
                {[
                    { label: 'Ingresos', value: toCurrency(stats.totalRevenue), trend: stats.trends?.revenue },
                    { label: 'Pedidos', value: stats.totalOrders, trend: stats.trends?.orders },
                    { label: 'Clientes', value: stats.totalCustomers, trend: stats.trends?.customers },
                    { label: 'Ticket Promedio', value: toCurrency(stats.avgOrderValue), trend: stats.trends?.avg },
                ].map((m, i) => (
                    <div key={i} className="bg-white p-5 md:p-6">
                        <p className="text-xs text-text-light uppercase tracking-wider mb-2">{m.label}</p>
                        <p className="text-xl md:text-2xl font-serif">{m.value}</p>
                        {m.trend && <span className="text-[10px] text-green-600 mt-1 block">{m.trend}</span>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 border border-gray-100">
                    <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-6">Ventas</h2>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.salesGraph}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c4918a" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#c4918a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9a9a9a' }} axisLine={false} tickLine={false} interval={3} />
                                <YAxis tick={{ fontSize: 10, fill: '#9a9a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                                <Tooltip
                                    contentStyle={{ border: '1px solid #e5e5e5', boxShadow: 'none', fontSize: '12px' }}
                                    formatter={(value: any) => [toCurrency(value), 'Ventas']}
                                />
                                <Area type="monotone" dataKey="ventas" stroke="#c4918a" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top products */}
                <div className="bg-white p-6 border border-gray-100 flex flex-col">
                    <h2 className="text-xs tracking-[0.15em] uppercase text-text-light mb-6">Mas Vendidos</h2>
                    <div className="flex-1">
                        {stats.topProducts.length > 0 ? (
                            <div className="space-y-4">
                                {stats.topProducts.map((product: any, index: number) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <span className="text-xs text-text-light w-5">{index + 1}.</span>
                                        <div className="flex-1">
                                            <p className="text-sm line-clamp-1">{product.name}</p>
                                            <div className="w-full bg-gray-100 h-px mt-2">
                                                <div className="bg-accent h-px" style={{ width: `${(product.quantity / stats.topProducts[0].quantity) * 100}%` }} />
                                            </div>
                                        </div>
                                        <span className="text-xs text-text-light">{product.quantity}u</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-text-light text-center py-10">Sin datos</p>
                        )}
                    </div>
                    <Link href="/admin/productos" className="mt-4 text-xs text-accent hover:text-accent-dark transition-colors text-center">
                        Ver inventario &rarr;
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent orders */}
                <div className="bg-white border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xs tracking-[0.15em] uppercase text-text-light">Pedidos Recientes</h2>
                        <Link href="/admin/pedidos" className="text-xs text-text-light hover:text-primary">Ver todos</Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {stats.recentOrders.length === 0 ? (
                            <div className="p-8 text-center text-text-light text-sm">No hay pedidos recientes.</div>
                        ) : (
                            stats.recentOrders.map((order: any) => (
                                <Link
                                    href={`/admin/pedidos/${order.id}`}
                                    key={order.id}
                                    className="px-6 py-4 flex items-center justify-between hover:bg-cream/50 transition-colors"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{order.user?.firstName || 'Invitado'} {order.user?.lastName}</p>
                                        <p className="text-xs text-text-light mt-0.5">{new Date(order.createdAt).toLocaleDateString('es-MX')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{toCurrency(order.total)}</p>
                                        <span className={`text-[10px] uppercase tracking-wider ${order.status === 'PENDING' ? 'text-yellow-600' :
                                            order.status === 'SHIPPED' ? 'text-blue-600' :
                                                order.status === 'DELIVERED' ? 'text-green-600' : 'text-text-light'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Stock alerts */}
                <div className="bg-white border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xs tracking-[0.15em] uppercase text-text-light">Alertas de Inventario</h2>
                        {stats.lowStockCount > 0 && (
                            <span className="text-xs text-red-500">{stats.lowStockCount} items</span>
                        )}
                    </div>
                    <div className="p-8 flex flex-col items-center justify-center text-center h-56">
                        {stats.lowStockCount > 0 ? (
                            <div>
                                <p className="text-lg font-serif mb-2">Atencion</p>
                                <p className="text-sm text-text-secondary mb-4">
                                    {stats.lowStockCount} productos con inventario bajo (&lt;5 unidades).
                                </p>
                                <Link href="/admin/productos" className="text-xs text-accent hover:text-accent-dark border-b border-accent/30 pb-0.5">
                                    Gestionar Inventario
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center">
                                <CheckCircle size={24} className="text-green-400 mx-auto mb-3" />
                                <p className="text-sm font-medium mb-1">Todo en orden</p>
                                <p className="text-xs text-text-light">Inventario saludable.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
