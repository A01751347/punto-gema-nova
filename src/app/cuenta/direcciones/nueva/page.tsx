'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { createAddressAction, AddressData } from '@/app/actions/address-actions';
import AddressForm from '@/components/account/AddressForm';
import Link from 'next/link';
import { useState } from 'react';

export default function NewAddressPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: AddressData) => {
        if (!user?.email) return;

        setIsLoading(true);
        const { success, error } = await createAddressAction(user.email, data);

        if (success) {
            router.push('/cuenta/direcciones');
            router.refresh();
        } else {
            alert(error || 'Error al guardar la dirección');
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-text-secondary">
                <Link href="/cuenta/direcciones" className="hover:text-primary">Mis Direcciones</Link>
                <span>/</span>
                <span className="text-text-primary font-medium">Nueva Dirección</span>
            </div>

            <h1 className="text-2xl font-serif text-text-primary mb-6">Agregar Nueva Dirección</h1>
            <AddressForm onSubmit={handleSubmit} submitLabel="Guardar Dirección" isLoading={isLoading} />
        </div>
    );
}
