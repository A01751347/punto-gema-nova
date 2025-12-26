'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { getBannerByIdAction, updateBannerAction } from '@/app/actions/admin/banner-actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function EditBannerPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Initial state
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        ctaText: '',
        ctaLink: '',
        position: 'hero',
        imageUrl: '',
        isActive: true
    });

    useEffect(() => {
        const fetchBanner = async () => {
            if (user?.email && params.id) {
                const { success, banner } = await getBannerByIdAction(user.email, params.id as string);
                if (success && banner) {
                    setFormData({
                        title: banner.title,
                        subtitle: banner.subtitle || '',
                        ctaText: banner.ctaText || '',
                        ctaLink: banner.ctaLink || '',
                        position: banner.position,
                        imageUrl: banner.imageUrl || '',
                        isActive: banner.isActive
                    });
                }
            }
            setIsFetching(false);
        };
        fetchBanner();
    }, [user, params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        // @ts-ignore
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.email || !params.id) return;

        setIsLoading(true);
        const data = new FormData(e.currentTarget);
        // Add checkboxes
        data.set('isActive', formData.isActive.toString());

        const { success, error } = await updateBannerAction(user.email, params.id as string, data);

        if (success) {
            router.push('/admin/marketing/banners');
        } else {
            alert(error || 'Failed to update banner');
        }
        setIsLoading(false);
    };

    if (isFetching) return <div className="p-8 text-gray-400">Cargando...</div>;

    return (
        <div className="max-w-xl">
            <h1 className="text-2xl font-serif text-gray-800 mb-6">Editar Banner</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100">
                <Input
                    label="Título Principal"
                    name="title"
                    required
                    fullWidth
                    value={formData.title}
                    onChange={handleChange as any}
                />
                <Input
                    label="Subtítulo"
                    name="subtitle"
                    fullWidth
                    value={formData.subtitle}
                    onChange={handleChange as any}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Texto del Botón"
                        name="ctaText"
                        placeholder="Ej: Ver Colección"
                        fullWidth
                        value={formData.ctaText}
                        onChange={handleChange as any}
                    />
                    <Input
                        label="Enlace del Botón"
                        name="ctaLink"
                        placeholder="/tienda"
                        fullWidth
                        value={formData.ctaLink}
                        onChange={handleChange as any}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                    <select
                        name="position"
                        className="w-full rounded-lg border-gray-300"
                        value={formData.position}
                        onChange={handleChange}
                    >
                        <option value="hero">Hero (Inicio)</option>
                        <option value="featured">Destacado</option>
                        <option value="promo">Promoción</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo (Opcional)</label>
                    {formData.imageUrl && (
                        <div className="mb-2 h-32 w-full relative rounded-lg overflow-hidden border border-gray-100">
                            <img src={formData.imageUrl} alt="Current" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary-light file:text-primary"
                    />
                    <p className="text-xs text-text-secondary mt-1">Sube una nueva imagen para reemplazar la actual.</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange as any}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                        Banner Activo
                    </label>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/admin/marketing/banners">
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>Guardar Cambios</Button>
                </div>
            </form>
        </div>
    );
}
