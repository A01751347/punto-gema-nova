'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const menuItems = [
        { label: 'Resumen', href: '/cuenta' },
        { label: 'Mis Pedidos', href: '/cuenta/pedidos' },
        { label: 'Direcciones', href: '/cuenta/direcciones' },
        { label: 'Mi Perfil', href: '/cuenta/perfil' },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="bg-white border border-gray-100 p-5">
            <h3 className="text-xs tracking-[0.15em] uppercase text-text-light mb-5 px-3">Mi Cuenta</h3>
            <nav className="space-y-0.5">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-3 py-2.5 text-sm transition-colors ${isActive
                                ? 'bg-cream text-primary font-medium'
                                : 'text-text-secondary hover:text-primary hover:bg-cream/50'
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                <div className="pt-3 mt-3 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:text-red-500 hover:bg-red-50/50 transition-colors"
                    >
                        Cerrar Sesion
                    </button>
                </div>
            </nav>
        </div>
    );
}
