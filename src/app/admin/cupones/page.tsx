'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminCouponsAction, deleteCouponAction } from '@/app/actions/admin/coupon-actions';
import Link from 'next/link';

export default function AdminCouponsPage() {
    const { user } = useAuth();
    const [coupons, setCoupons] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCoupons = async () => {
        if (user?.email) {
            const { success, coupons } = await getAdminCouponsAction(user.email);
            if (success) setCoupons(coupons);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadCoupons();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar este cupón?')) return;
        if (user?.email) {
            const { success } = await deleteCouponAction(user.email, id);
            if (success) loadCoupons();
        }
    };

    if (isLoading) return <div className="p-8 text-gray-400">Cargando cupones...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-gray-800">Cupones de Descuento</h1>
                <Link href="/admin/cupones/nuevo" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                    + Nuevo Cupón
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-6 py-4">Código</th>
                            <th className="px-6 py-4">Descuento</th>
                            <th className="px-6 py-4">Mínimo</th>
                            <th className="px-6 py-4">Expira</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {coupons.map((coupon) => (
                            <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono font-bold text-gray-900">{coupon.code}</td>
                                <td className="px-6 py-4">
                                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                                </td>
                                <td className="px-6 py-4">
                                    {coupon.minPurchase ? `$${coupon.minPurchase.toFixed(2)}` : '-'}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Nunca'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {coupon.isActive ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(coupon.id)} className="text-red-500 hover:underline">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {coupons.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No hay cupones activos.</div>
                )}
            </div>
        </div>
    );
}
