'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminStatsAction } from '@/app/actions/admin/admin-actions';
import Link from 'next/link';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar, Cell
} from 'recharts';
import {
    DollarSign, ShoppingBag, Users, TrendingUp, AlertTriangle,
    ArrowRight, Package, Clock, Mail
} from 'lucide-react';


// Inline helper if utils not found or to be safe
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
                if (success) {
                    setStats(fetchedStats);
                }
            }
            setIsLoading(false);
        };
        fetchStats();
    }, [user, timeRange]);

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-[#2c4a52] animate-pulse">Cargando tablero...</div>
            </div>
        );
    }

    if (!stats) return <div className="p-8">No se pudieron cargar las estadísticas.</div>;

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-3xl font-serif text-[#2c4a52] mb-2">Panel de Control</h1>
                    <p className="text-gray-500">Resumen general de tu tienda y rendimiento.</p>
                </div>
                <div>
                    <select
                        className="border border-gray-200 rounded-lg text-sm text-gray-700 py-2 px-3 outline-none focus:ring-2 focus:ring-[#2c4a52]/30 cursor-pointer shadow-sm"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="1m">Último mes</option>
                        <option value="3m">Últimos 3 meses</option>
                        <option value="6m">Últimos 6 meses</option>
                        <option value="1y">Último año</option>
                        <option value="all">Todo el tiempo</option>
                    </select>
                </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Ingresos Totales"
                    value={toCurrency(stats.totalRevenue)}
                    icon={<DollarSign className="text-green-600" size={24} />}
                    trend={stats.trends?.revenue}
                    color="green"
                />
                <StatCard
                    title="Pedidos Totales"
                    value={stats.totalOrders}
                    icon={<ShoppingBag className="text-blue-600" size={24} />}
                    trend={stats.trends?.orders}
                    color="blue"
                />
                <StatCard
                    title="Nuevos Clientes"
                    value={stats.totalCustomers}
                    icon={<Users className="text-purple-600" size={24} />}
                    trend={stats.trends?.customers}
                    color="purple"
                />
                <StatCard
                    title="Ticket Promedio"
                    value={toCurrency(stats.avgOrderValue)}
                    icon={<TrendingUp className="text-[#d4af37]" size={24} />}
                    trend={stats.trends?.avg}
                    color="yellow"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Sales Chart Area */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-[#2c4a52]">Ventas en el periodo (o últ. 30 días)</h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.salesGraph}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2c4a52" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2c4a52" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={3}
                                />
                                <YAxis
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: any) => [toCurrency(value), 'Ventas']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="ventas"
                                    stroke="#2c4a52"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h2 className="text-lg font-bold text-[#2c4a52] mb-6">Más Vendidos</h2>
                    <div className="flex-1">
                        {stats.topProducts.length > 0 ? (
                            <div className="space-y-6">
                                {stats.topProducts.map((product: any, index: number) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="font-bold text-gray-300 text-lg w-4">#{index + 1}</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                                <div
                                                    className="bg-[#d4af37] h-1.5 rounded-full"
                                                    style={{ width: `${(product.quantity / stats.topProducts[0].quantity) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {product.quantity} u
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-10">No hay datos suficientes</p>
                        )}
                    </div>
                    <Link href="/admin/productos" className="mt-6 text-sm text-[#2c4a52] font-semibold flex items-center justify-center hover:underline">
                        Ver inventario <ArrowRight size={14} className="ml-1" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-bold text-[#2c4a52]">Pedidos Recientes</h2>
                        <Link href="/admin/pedidos" className="text-xs text-gray-500 hover:text-[#2c4a52]">
                            Ver todos
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {stats.recentOrders.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">No hay pedidos recientes.</div>
                        ) : (
                            stats.recentOrders.map((order: any) => (
                                <Link
                                    href={`/admin/pedidos/${order.id}`}
                                    key={order.id}
                                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 p-2 rounded-lg text-gray-500 group-hover:bg-[#2c4a52] group-hover:text-white transition-colors">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm">
                                                {order.user?.firstName || 'Invitado'} {order.user?.lastName}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-[#2c4a52] text-sm">{toCurrency(order.total)}</div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                                            order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700' :
                                                order.status === 'DELIVERED' ? 'bg-green-50 text-green-700' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-bold text-[#2c4a52] flex items-center gap-2">
                            <AlertTriangle size={18} className="text-red-500" /> Alertas de Inventario
                        </h2>
                        {stats.lowStockCount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                                {stats.lowStockCount} artículos
                            </span>
                        )}
                    </div>
                    <div className="p-8 flex flex-col items-center justify-center text-center h-64">
                        {stats.lowStockCount > 0 ? (
                            <div className="max-w-xs">
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertTriangle size={32} className="text-red-500" />
                                </div>
                                <h3 className="text-gray-900 font-bold mb-2">Atención Requerida</h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Hay {stats.lowStockCount} productos con inventario bajo (menos de 5 unidades).
                                </p>
                                <Link href="/admin/productos" className="inline-block bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50">
                                    Gestionar Inventario
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-green-500" />
                                </div>
                                <h3 className="text-gray-900 font-bold mb-2">Todo en órden</h3>
                                <p className="text-gray-500 text-sm">
                                    El inventario se ve saludable.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, color }: any) {
    const bgColors: any = {
        green: 'bg-green-50',
        blue: 'bg-blue-50',
        purple: 'bg-purple-50',
        yellow: 'bg-yellow-50',
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bgColors[color] || 'bg-gray-50'}`}>
                    {icon}
                </div>
                {trend && (
                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold">
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-[#2c4a52]">{value}</h3>
            </div>
        </div>
    );
}

import { CheckCircle } from 'lucide-react';
