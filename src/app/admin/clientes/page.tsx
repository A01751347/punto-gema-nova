'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminCustomersAction } from '@/app/actions/admin/customer-actions';

export default function AdminCustomersPage() {
    const { user } = useAuth();
    const [customers, setCustomers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                                        <button className="text-primary hover:underline">Ver Historial</button>
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
        </div>
    );
}
