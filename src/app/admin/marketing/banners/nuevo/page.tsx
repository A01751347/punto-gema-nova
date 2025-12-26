'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { createBannerAction } from '@/app/actions/admin/banner-actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function NewBannerPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.email) return;

        setIsLoading(true);
        const data = new FormData(e.currentTarget);
        const { success, error } = await createBannerAction(user.email, data);

        if (success) {
            router.push('/admin/marketing/banners');
        } else {
            alert(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-xl">
            <h1 className="text-2xl font-serif text-gray-800 mb-6">Nuevo Banner</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100">
                <Input label="Título Principal" name="title" required fullWidth />
                <Input label="Subtítulo" name="subtitle" fullWidth />

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Texto del Botón" name="ctaText" placeholder="Ej: Ver Colección" fullWidth />
                    <Input label="Enlace del Botón" name="ctaLink" placeholder="/tienda" fullWidth />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                    <select name="position" className="w-full rounded-lg border-gray-300">
                        <option value="hero">Hero (Inicio)</option>
                        <option value="featured">Destacado</option>
                        <option value="promo">Promoción</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo</label>
                    <input type="file" name="image" required accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary-light file:text-primary" />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/admin/marketing/banners">
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>Crear Banner</Button>
                </div>
            </form>
        </div>
    );
}
