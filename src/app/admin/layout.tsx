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
        { label: 'Tablero', href: '/admin', icon: 'LayoutDashboard' },
        { label: 'Ventas', href: '/admin/pedidos', icon: 'ShoppingBag' },
        { label: 'Inventario', href: '/admin/productos', icon: 'Package' },
        { label: 'Usuarios', href: '/admin/clientes', icon: 'Users' },
        { label: 'Bitácora', href: '/admin/blog', icon: 'BookOpen' }, // Added Blog
        { label: 'Tienda', href: '/admin/marketing/banners', icon: 'Store' },
        { label: 'Descuentos', href: '/admin/cupones', icon: 'Tag' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#F2EFE9] border-r border-[#E6E0D9] hidden md:flex flex-col flex-shrink-0 shadow-lg z-20">

                <div className="p-8 border-b border-[#2c4a52]/10">
                    <h2 className="text-xl font-bold tracking-wider text-[#2c4a52] uppercase">YUTNÜÜ Panel</h2>
                    <p className="text-xs text-[#2c4a52]/60 mt-1 uppercase tracking-widest">Administración</p>
                </div>
                <nav className="flex-1 mt-6 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const active = pathname === item.href; // Exact match for dashboard
                        const isActiveGroup = pathname.startsWith(item.href) && item.href !== '/admin';
                        const isSelected = active || isActiveGroup;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-bold uppercase tracking-wider
                                ${isSelected
                                        ? 'bg-[#2c4a52] text-white shadow-md translate-x-1'
                                        : 'text-[#2c4a52]/70 hover:text-[#2c4a52] hover:bg-white'
                                    }`}

                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 p-6 w-64 border-t border-[#2c4a52]/10">
                    <Link href="/" className="text-xs font-bold uppercase tracking-wider text-[#2c4a52]/60 hover:text-[#2c4a52] flex items-center gap-2">
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
