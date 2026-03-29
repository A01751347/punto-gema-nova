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

    const menuItems: Array<{ label: string; href: string; icon?: string }> = [
        { label: 'Tablero', href: '/admin', icon: 'LayoutDashboard' },
        { label: 'Ventas', href: '/admin/pedidos', icon: 'ShoppingBag' },
        { label: 'Inventario', href: '/admin/productos', icon: 'Package' },
        { label: 'Usuarios', href: '/admin/clientes', icon: 'Users' },
        { label: 'Bitácora', href: '/admin/blog', icon: 'BookOpen' },
        { label: 'Tienda', href: '/admin/marketing/banners', icon: 'Store' },
        { label: 'Descuentos', href: '/admin/cupones', icon: 'Tag' },
        { label: 'Facturas', href: '/admin/facturas', icon: 'FileInvoice' },
        { label: 'Configuración', href: '/admin/configuracion', icon: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans antialiased">
            {/* Sidebar */}
            <aside className="relative w-64 bg-[#F2EFE9] border-r border-[#E6E0D9] hidden md:flex flex-col flex-shrink-0 shadow-lg z-20">
                <div className="p-8 border-b border-[#1a1a1a]/10">
                    <h2 className="text-xl font-bold tracking-wider text-[#1a1a1a] uppercase">
                        Punto Gema Nova
                    </h2>
                    <p className="text-xs text-[#1a1a1a]/70 mt-1 uppercase tracking-widest">
                        Administración
                    </p>
                </div>

                {/* pb-24 para que el footer no se encime */}
                <nav className="flex-1 mt-6 px-4 space-y-2 pb-24">
                    {menuItems.map((item) => {
                        const active = pathname === item.href;
                        const isActiveGroup =
                            item.href !== '/admin' && pathname.startsWith(item.href);
                        const isSelected = active || isActiveGroup;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  text-base font-semibold tracking-wide
                  ${isSelected
                                        ? 'bg-[#1a1a1a] text-white shadow-md translate-x-1'
                                        : 'text-[#1a1a1a] hover:bg-white/80 hover:text-[#1f3940]'
                                    }
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a]/30
                `}
                                aria-current={isSelected ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer fijo al fondo del aside (ahora sí, porque el aside es relative) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#1a1a1a]/10 bg-[#F2EFE9]">
                    <Link
                        href="/"
                        className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/70 hover:text-[#1a1a1a] flex items-center gap-2"
                    >
                        <span>&larr;</span> Volver a la Tienda
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header (solo en pantallas pequeñas) */}
                <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 md:hidden">
                    <div className="font-bold text-[#1a1a1a] tracking-wide">PGN Admin</div>
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                        Salir
                    </Link>
                </header>

                <main className="flex-1 overflow-auto p-6 md:p-12">{children}</main>
            </div>
        </div>
    );
}
