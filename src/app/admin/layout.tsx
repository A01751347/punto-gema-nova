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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-text-secondary">Verificando acceso...</p>
            </div>
        );
    }

    const menuItems = [
        { label: 'Tablero', href: '/admin' },
        { label: 'Ventas', href: '/admin/pedidos' },
        { label: 'Inventario', href: '/admin/productos' },
        { label: 'Usuarios', href: '/admin/clientes' },
        { label: 'Blog', href: '/admin/blog' },
        { label: 'Banners', href: '/admin/marketing/banners' },
        { label: 'Descuentos', href: '/admin/cupones' },
        { label: 'Facturas', href: '/admin/facturas' },
        { label: 'Config', href: '/admin/configuracion' },
    ];

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside className="relative w-56 bg-primary text-white hidden md:flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-white/10">
                    <span className="font-serif text-lg tracking-[0.1em]">PGN</span>
                    <span className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mt-0.5">Admin</span>
                </div>

                <nav className="flex-1 mt-4 px-3 space-y-0.5 pb-20">
                    {menuItems.map((item) => {
                        const active = pathname === item.href;
                        const isActiveGroup = item.href !== '/admin' && pathname.startsWith(item.href);
                        const isSelected = active || isActiveGroup;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-3 py-2.5 text-sm transition-colors ${isSelected
                                    ? 'text-white bg-white/10'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Link
                        href="/"
                        className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2"
                    >
                        &larr; Volver a la Tienda
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile header */}
                <header className="bg-primary text-white h-12 flex items-center justify-between px-4 md:hidden">
                    <span className="font-serif text-sm tracking-wider">PGN Admin</span>
                    <Link href="/" className="text-xs text-white/60">Salir</Link>
                </header>

                <main className="flex-1 overflow-auto p-6 md:p-10 bg-gray-50/50">{children}</main>
            </div>
        </div>
    );
}
