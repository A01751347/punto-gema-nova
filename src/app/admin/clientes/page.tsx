'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminCustomersAction } from '@/app/actions/admin/customer-actions';

// Import the new action and components
import { getCustomerOrderHistoryAction } from '@/app/actions/admin/customer-history';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';
import { Package } from 'lucide-react';

export default function AdminCustomersPage() {
    const { user } = useAuth();
    const [customers, setCustomers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [customerOrders, setCustomerOrders] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    useEffect(() => {
        const loadCustomers = async () => {
            if (user?.email) {
                const { success, customers } = await getAdminCustomersAction(user.email);
                if (success && customers) setCustomers(customers);
            }
            setIsLoading(false);
        };
        loadCustomers();
    }, [user]);

    const handleViewHistory = async (customer: any) => {
        setSelectedCustomer(customer);
        setIsHistoryModalOpen(true);
        setIsLoadingHistory(true);

        if (user?.email) {
            const { success, orders } = await getCustomerOrderHistoryAction(user.email, customer.id);
            if (success && orders) {
                setCustomerOrders(orders);
            }
        }
        setIsLoadingHistory(false);
    };

    if (isLoading) return <div className="p-8 text-gray-400">Cargando clientes...</div>;

    return (
        <div>
            <h1 className="text-2xl font-serif text-gray-800 mb-6">Clientes</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Rol</th>
                                <th className="px-6 py-4">Fecha de Registro</th>
                                <th className="px-6 py-4">Pedidos</th>
                                <th className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {customer.firstName} {customer.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${customer.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {customer.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(customer.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {customer._count.orders}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewHistory(customer)}
                                            className="text-primary hover:underline"
                                        >
                                            Ver Historial
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {customers.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No hay clientes registrados.</div>
                )}
            </div>

            {/* Order History Modal */}
            <Modal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                title={selectedCustomer ? `Historial de ${selectedCustomer.firstName}` : 'Historial de Pedidos'}
                size="xl"
            >
                {isLoadingHistory ? (
                    <div className="py-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : customerOrders.length > 0 ? (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {customerOrders.map(order => (
                            <div key={order.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-mono font-medium text-gray-900">{order.orderNumber}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-100' :
                                            order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                'bg-yellow-50 text-yellow-700 border-yellow-100'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 flex gap-3">
                                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Package size={12} />
                                            {order._count.items} artículos
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-gray-900">${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
                                    <Link href={`/admin/pedidos/${order.id}`} className="text-xs text-primary hover:underline mt-1 inline-block">
                                        Ver Detalles &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        Este cliente no tiene pedidos registrados.
                    </div>
                )}
            </Modal>
        </div>
    );
}
