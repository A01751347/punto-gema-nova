'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setLoading(true);

        try {
            await register(email, password, { firstName, lastName });
            router.push(`/verificar?email=${encodeURIComponent(email)}`);
        } catch (err: any) {
            console.error(err);
            if (err.message && err.message.includes('User already exists')) {
                setError('Ya existe una cuenta con este correo.');
            } else {
                setError(err.message || 'Error al registrar cuenta.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-white">
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-text-primary mb-2">Crear Cuenta</h1>
                    <p className="text-text-secondary">Únete a la comunidad Yutnüu</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-soft-lg border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
                                </svg>
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
                                placeholder="Ana"
                            />
                            <Input
                                label="Apellidos"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                fullWidth
                                placeholder="García"
                            />
                        </div>

                        <Input
                            label="Correo Electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            placeholder="nombre@ejemplo.com"
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            placeholder="Mínimo 8 caracteres"
                        />

                        <Input
                            label="Confirmar Contraseña"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            fullWidth
                            placeholder="••••••••"
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg shadow-lg"
                            isLoading={loading}
                        >
                            Registrarse
                        </Button>
                    </form>
                </div>

                <div className="text-center text-text-secondary">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
