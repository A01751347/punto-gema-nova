'use client';

import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { updateAddressAction, getAddressAction, AddressData } from '@/app/actions/address-actions';
import AddressForm from '@/components/account/AddressForm';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EditAddressPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState<AddressData | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            if (user?.email && params.id) {
                const { success, address } = await getAddressAction(user.email, params.id as string);
                if (success && address) {
                    setInitialData({
                        firstName: address.firstName,
                        lastName: address.lastName,
                        address1: address.address1,
                        address2: address.address2 || '',
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode,
                        country: address.country,
                        phone: address.phone,
                        isDefault: address.isDefault
                    });
                } else {
                    router.push('/cuenta/direcciones'); // Redirect if not found
                }
            }
            setIsFetching(false);
        };
        fetchAddress();
    }, [user, params.id, router]);

    const handleSubmit = async (data: AddressData) => {
        if (!user?.email || !params.id) return;

        setIsLoading(true);
        const { success, error } = await updateAddressAction(user.email, params.id as string, data);

        if (success) {
            router.push('/cuenta/direcciones');
            router.refresh();
        } else {
            alert(error || 'Error al actualizar la dirección');
        }
        setIsLoading(false);
    };

    if (isFetching) {
        return <div className="p-8 text-center text-gray-400">Cargando...</div>;
    }

    if (!initialData) {
        return null;
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-text-secondary">
                <Link href="/cuenta/direcciones" className="hover:text-primary">Mis Direcciones</Link>
                <span>/</span>
                <span className="text-text-primary font-medium">Editar Dirección</span>
            </div>

            <h1 className="text-2xl font-serif text-text-primary mb-6">Editar Dirección</h1>
            <AddressForm
                initialData={initialData}
                onSubmit={handleSubmit}
                submitLabel="Actualizar Dirección"
                isLoading={isLoading}
            />
        </div>
    );
}
