'use client';

import { useAuth } from '@/lib/auth/auth-context';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-2">
                    Hola, {user?.firstName || 'Usuario'}
                </h1>
                <p className="text-text-secondary">
                    Desde tu panel de control puedes ver tus pedidos recientes, gestionar tus direcciones y editar tu contraseña y detalles de la cuenta.
                </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders Preview */}
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-text-primary">Pedidos Recientes</h2>
                        <Link href="/cuenta/pedidos" className="text-primary text-sm hover:underline">
                            Ver todos
                        </Link>
                    </div>
                    {/* Placeholder for when orders exist */}
                    <div className="text-center py-8 text-text-secondary text-sm">
                        <p className="mb-2">No tienes pedidos recientes.</p>
                        <Link href="/tienda" className="text-primary font-medium hover:underline">
                            Ir a la tienda
                        </Link>
                    </div>
                </div>

                {/* Account Details Preview */}
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-text-primary">Detalles de la Cuenta</h2>
                        <Link href="/cuenta/perfil" className="text-primary text-sm hover:underline">
                            Editar
                        </Link>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-text-primary font-medium">{user?.firstName} {user?.lastName}</p>
                        <p className="text-text-secondary">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
