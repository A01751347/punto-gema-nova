'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getUserAddressesAction, deleteAddressAction, setDefaultAddressAction } from '@/app/actions/address-actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Plus, Pencil, Trash2, CheckCircle, Star } from 'lucide-react';

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
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-gray-100 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-48 bg-gray-50 rounded-xl border border-gray-100"></div>
                    <div className="h-48 bg-gray-50 rounded-xl border border-gray-100"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-[#2c4a52]" />
                    <h1 className="text-xl font-bold text-[#2c4a52] uppercase tracking-wider">Mis Direcciones</h1>
                </div>
                <Link
                    href="/cuenta/direcciones/nueva"
                    className="flex items-center gap-2 bg-[#2c4a52] hover:bg-[#1a2c32] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Nueva Dirección</span>
                </Link>
            </div>

            {addresses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                    <MapPin size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 mb-4 text-sm">No tienes direcciones guardadas.</p>
                    <Link
                        href="/cuenta/direcciones/nueva"
                        className="inline-flex items-center gap-2 text-[#2c4a52] font-bold text-xs uppercase tracking-wider border-b border-[#2c4a52] pb-0.5 hover:opacity-70 transition-opacity"
                    >
                        Agregar mi primera dirección
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            className={`p-6 rounded-xl border transition-all duration-300 relative group flex flex-col ${address.isDefault
                                    ? 'border-[#2c4a52]/30 bg-[#F2EFE9]/30 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-[#2c4a52]/30 hover:shadow-md'
                                }`}
                        >
                            {address.isDefault && (
                                <span className="absolute top-4 right-4 bg-[#F2EFE9] text-[#2c4a52] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-[#E6E0D9] flex items-center gap-1">
                                    <Star size={10} fill="currentColor" /> Predeterminada
                                </span>
                            )}

                            <div className="flex-1 pr-12">
                                <p className="font-bold text-[#2c4a52] mb-2 text-sm">
                                    {address.firstName} {address.lastName}
                                </p>
                                <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                                    <p>{address.address1}</p>
                                    {address.address2 && <p>{address.address2}</p>}
                                    <p>{address.city}, {address.state} {address.postalCode}</p>
                                    <p className="uppercase text-xs text-gray-400 mt-1">{address.country}</p>
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <span className="font-medium">Tel:</span> {address.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                                <Link
                                    href={`/cuenta/direcciones/editar/${address.id}`}
                                    className="flex items-center gap-1.5 text-xs font-bold text-[#2c4a52] hover:bg-gray-100 px-2 py-1.5 rounded transition-colors"
                                >
                                    <Pencil size={12} /> Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(address.id)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:bg-red-50 px-2 py-1.5 rounded transition-colors"
                                >
                                    <Trash2 size={12} /> Eliminar
                                </button>

                                {!address.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(address.id)}
                                        className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#2c4a52] transition-colors"
                                        title="Establecer como predeterminada"
                                    >
                                        <CheckCircle size={14} /> <span className="hidden sm:inline">Seleccionar principal</span>
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
