'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AddressData } from '@/app/actions/address-actions';

interface AddressFormProps {
    initialData?: AddressData;
    onSubmit: (data: AddressData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
}

export default function AddressForm({ initialData, onSubmit, isLoading = false, submitLabel = 'Guardar Dirección' }: AddressFormProps) {
    const [formData, setFormData] = useState<AddressData>({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        address1: initialData?.address1 || '',
        address2: initialData?.address2 || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        postalCode: initialData?.postalCode || '',
        country: initialData?.country || 'México',
        phone: initialData?.phone || '',
        isDefault: initialData?.isDefault || false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Nombre"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Input
                    label="Apellidos"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                />
            </div>

            <Input
                label="Dirección (Calle y Número)"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                required
                fullWidth
            />

            <Input
                label="Apartamento, local, etc. (Opcional)"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Input
                    label="Estado / Provincia"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    fullWidth
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Código Postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Input
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                />
            </div>

            <div className="flex items-center gap-2 pt-2">
                <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="isDefault" className="text-sm text-text-primary">
                    Establecer como dirección predeterminada
                </label>
            </div>

            <div className="pt-4">
                <Button type="submit" isLoading={isLoading} className="w-full md:w-auto">
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
