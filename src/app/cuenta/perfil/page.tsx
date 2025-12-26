'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { updateUserAction } from '@/app/actions/auth-actions';
import { User } from 'lucide-react';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [phone, setPhone] = useState(user?.phone || '');

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
            // Check if backend supports phone update yet. Based on recent createOrder update, I assume DB has phone.
            // But updateUserAction might need update. I'll stick to firstName/lastName for now unless I verify the action.
            // User context has phone? Yes, I added phone to createOrder update.
            // I should assume updateUserAction needs to support it. 
            // For now, I will include phone in the UI and state, but maybe pass it.
            // Wait, looking at lines 7-7 (import), I can't see the action code here.
            // I'll stick to first/last name to avoid breaking if action doesn't accept phone.
            // The user didn't explicitly ask for phone editing here, but it's good practice.
            // I'll stick to what was there (First/Last) + Phone if I can confirm action support.
            // I'll add "Teléfono" as a disabled field or editable if I'm sure.
            // Let's just do Name for now to be safe, or check action.
            // Actually, I'll check action in next step if needed. 
            // For UI consistency, I will just replicate the existing fields first.

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
        <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                <User size={20} className="text-[#2c4a52]" />
                <h2 className="text-xl font-bold text-[#2c4a52] uppercase tracking-wider">Mi Perfil</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {success && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-100 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <Input
                            label="Nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            fullWidth
                            className="text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <Input
                            label="Apellidos"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            fullWidth
                            className="text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">El correo electrónico no se puede cambiar.</p>
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="bg-[#2c4a52] hover:bg-[#1a2c32] text-white px-8 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors w-full md:w-auto"
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </div>
    );
}
