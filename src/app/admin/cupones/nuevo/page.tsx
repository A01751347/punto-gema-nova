'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { createCouponAction } from '@/app/actions/admin/coupon-actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function NewCouponPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.email) return;

        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            code: formData.get('code'),
            discountType: formData.get('discountType'),
            discountValue: formData.get('discountValue'),
            minPurchase: formData.get('minPurchase'),
            expiresAt: formData.get('expiresAt')
        };

        const { success, error } = await createCouponAction(user.email, data);

        if (success) {
            router.push('/admin/cupones');
        } else {
            alert(error || 'Error creando cupón');
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <Link href="/admin/cupones" className="hover:text-primary">Cupones</Link>
                <span>/</span>
                <span>Nuevo</span>
            </div>

            <h1 className="text-2xl font-serif text-gray-800 mb-8">Nuevo Cupón</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <Input label="Código del Cupón" name="code" placeholder="Ej: VERANO20" required fullWidth />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Descuento</label>
                        <select name="discountType" className="w-full rounded-lg border-gray-300">
                            <option value="percentage">Porcentaje (%)</option>
                            <option value="fixed">Monto Fijo ($)</option>
                        </select>
                    </div>
                    <Input label="Valor" name="discountValue" type="number" placeholder="20" required fullWidth />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Compra Mínima ($)" name="minPurchase" type="number" placeholder="0" fullWidth />
                    <Input label="Fecha de Expiración" name="expiresAt" type="date" fullWidth />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/admin/cupones">
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>Crear Cupón</Button>
                </div>
            </form>
        </div>
    );
}
