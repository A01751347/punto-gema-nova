'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminBannersAction, deleteBannerAction } from '@/app/actions/admin/banner-actions';
import Link from 'next/link';

export default function AdminBannersPage() {
    const { user } = useAuth();
    const [banners, setBanners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadBanners = async () => {
        if (user?.email) {
            const { success, banners } = await getAdminBannersAction(user.email);
            if (success && banners) setBanners(banners);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadBanners();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar este banner?')) return;
        if (user?.email) {
            const { success } = await deleteBannerAction(user.email, id);
            if (success) loadBanners();
        }
    };

    if (isLoading) return <div className="p-8 text-gray-400">Cargando banners...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-gray-800">Banners y Contenido</h1>
                <Link href="/admin/marketing/banners/nuevo" className="bg-primary text-white px-4 py-2 rounded-lg">
                    + Nuevo Banner
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner) => (
                    <div key={banner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                            {banner.imageUrl ? (
                                <img src={banner.imageUrl} alt={banner.title} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded capitalize">{banner.position}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium text-lg text-gray-900">{banner.title}</h3>
                            <p className="text-gray-500 text-sm mb-4">{banner.subtitle}</p>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {banner.isActive ? 'Activo' : 'Inactivo'}
                                </span>
                                <div className="flex gap-4">
                                    <Link href={`/admin/marketing/banners/editar/${banner.id}`} className="text-primary text-sm hover:underline">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(banner.id)} className="text-red-500 text-sm hover:underline">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {banners.length === 0 && (
                <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No tienes banners activos. Crea uno para destacar tu contenido.
                </div>
            )}
        </div>
    );
}
