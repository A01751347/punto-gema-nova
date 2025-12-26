'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { updateUserAction } from '@/app/actions/auth-actions';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!user?.email) {
            setError('Error de sesión. Recarga la página.');
            setIsLoading(false);
            return;
        }

        try {
            const { success, error } = await updateUserAction(user.email, { firstName, lastName });
            if (success) {
                setSuccess('Perfil actualizado correctamente.');
                await refreshUser();
            } else {
                setError(error || 'Error al actualizar perfil.');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl">
            <h2 className="text-2xl font-serif text-text-primary mb-6">Mi Perfil</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {success && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-100">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                    />
                    <Input
                        label="Apellidos"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                    />
                </div>

                <div className="pt-2">
                    <Button type="submit" isLoading={isLoading} className="w-full md:w-auto px-8">
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </div>
    );
}
