'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getUserAddressesAction, deleteAddressAction, setDefaultAddressAction } from '@/app/actions/address-actions';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface Address {
    id: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
}

export default function AddressesPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAddresses = async () => {
        if (user?.email) {
            const { success, addresses } = await getUserAddressesAction(user.email);
            if (success && addresses) {
                setAddresses(addresses);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAddresses();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta dirección?')) return;

        if (user?.email) {
            await deleteAddressAction(user.email, id);
            fetchAddresses(); // Refresh list
        }
    };

    const handleSetDefault = async (id: string) => {
        if (user?.email) {
            await setDefaultAddressAction(user.email, id);
            fetchAddresses(); // Refresh list
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-400">Cargando direcciones...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-text-primary">Mis Direcciones</h1>
                <Link href="/cuenta/direcciones/nueva">
                    <Button>Agregar Nueva</Button>
                </Link>
            </div>

            {addresses.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-text-secondary mb-4">No tienes direcciones guardadas.</p>
                    <Link href="/cuenta/direcciones/nueva">
                        <Button variant="outline">Agregar Dirección</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <div key={address.id} className={`p-6 rounded-xl border ${address.isDefault ? 'border-primary bg-primary-light/5' : 'border-gray-100 bg-white'} relative group`}>
                            {address.isDefault && (
                                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                    Predeterminada
                                </span>
                            )}

                            <div className="pr-12">
                                <p className="font-medium text-text-primary mb-1">
                                    {address.firstName} {address.lastName}
                                </p>
                                <div className="text-sm text-text-secondary space-y-0.5">
                                    <p>{address.address1}</p>
                                    {address.address2 && <p>{address.address2}</p>}
                                    <p>{address.city}, {address.state} {address.postalCode}</p>
                                    <p>{address.country}</p>
                                    <p className="pt-2">Tel: {address.phone}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <Link href={`/cuenta/direcciones/editar/${address.id}`} className="text-sm text-primary hover:underline">
                                    Editar
                                </Link>
                                <button onClick={() => handleDelete(address.id)} className="text-sm text-red-500 hover:underline">
                                    Eliminar
                                </button>
                                {!address.isDefault && (
                                    <button onClick={() => handleSetDefault(address.id)} className="text-sm text-text-secondary hover:text-primary ml-auto">
                                        Hacer predeterminada
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
