'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/'); // Or dashboard
        } catch (err: any) {
            console.error(err);
            // Translate common Cognito errors if possible, for now generic
            if (err.message && err.message.includes('Incorrect username or password')) {
                setError('Correo o contraseña incorrectos.');
            } else if (err.message && err.message.includes('User is not confirmed')) {
                setError('Tu cuenta no ha sido confirmada. Revisa tu correo.');
            } else {
                setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-text-primary mb-2">Bienvenido</h1>
                    <p className="text-text-secondary">Inicia sesión en tu cuenta</p>
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

                        <Input
                            label="Correo Electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            placeholder="nombre@ejemplo.com"
                        />

                        <div>
                            <Input
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                placeholder="••••••••"
                            />
                            <div className="flex justify-end mt-2">
                                <Link
                                    href="/recuperar-password"
                                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg shadow-lg"
                            isLoading={loading}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </div>

                <div className="text-center text-text-secondary">
                    ¿No tienes una cuenta?{' '}
                    <Link href="/registro" className="text-primary font-medium hover:underline">
                        Crear Cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
}
