'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user?.role !== 'ADMIN') {
                router.push('/');
            } else {
                setIsAuthorized(true);
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="text-gray-400 font-medium">Verificando acceso...</div>
                </div>
            </div>
        );
    }

    const menuItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Pedidos', href: '/admin/pedidos' },
        { label: 'Productos', href: '/admin/productos' },
        { label: 'Clientes', href: '/admin/clientes' },
        { label: 'Banners', href: '/admin/marketing/banners' },
        { label: 'Cupones', href: '/admin/cupones' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-dark text-white hidden md:block flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold tracking-wider">ADMIN</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-4 py-3 rounded-lg transition-colors ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 p-6 w-64 border-t border-white/10">
                    <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
                        <span>&larr;</span> Volver a la Tienda
                    </Link>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 md:hidden">
                    <div className="font-bold text-primary">ADMIN PANEL</div>
                    <Link href="/" className="text-sm text-gray-500">Salir</Link>
                </header>

                <main className="flex-1 overflow-auto p-6 md:p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
