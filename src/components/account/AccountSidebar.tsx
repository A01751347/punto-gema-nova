'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Home, Package, MapPin, User, LogOut } from 'lucide-react';

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const menuItems = [
        { label: 'Resumen', href: '/cuenta', icon: Home },
        { label: 'Mis Pedidos', href: '/cuenta/pedidos', icon: Package },
        { label: 'Direcciones', href: '/cuenta/direcciones', icon: MapPin },
        { label: 'Mi Perfil', href: '/cuenta/perfil', icon: User },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-bold text-[#2c4a52] uppercase tracking-wider mb-6 px-4">Mi Cuenta</h3>
            <nav className="space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${isActive
                                ? 'bg-[#F2EFE9] text-[#2c4a52] font-bold'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#2c4a52]'
                                }`}
                        >
                            <Icon size={16} className={isActive ? 'text-[#2c4a52]' : 'text-gray-400'} />
                            {item.label}
                        </Link>
                    );
                })}

                <div className="pt-4 mt-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 text-sm font-medium group"
                    >
                        <LogOut size={16} className="text-red-400 group-hover:text-red-500" />
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        </div>
    );
}
