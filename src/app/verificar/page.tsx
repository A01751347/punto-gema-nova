'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { confirmSignUpAction } from '@/app/actions/auth-actions';

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get('email') || '';

    const [email, setEmail] = useState(emailParam);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [emailParam]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { success, error } = await confirmSignUpAction(email, code);

            if (success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(error || 'Código inválido o expirado.');
            }
        } catch (err) {
            setError('Ocurrió un error al verificar. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-soft-lg border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-serif text-text-primary">¡Cuenta Verificada!</h2>
                    <p className="text-text-secondary">
                        Tu correo ha sido confirmado exitosamente. Serás redirigido al inicio de sesión.
                    </p>
                    <Link href="/login">
                        <Button className="w-full">Ir a Iniciar Sesión Ahora</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-serif text-text-primary mb-2">Verificar Correo</h1>
                    <p className="text-text-secondary">Ingresa el código de verificación enviado a tu email</p>
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

                        <Input
                            label="Código de Verificación"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            fullWidth
                            placeholder="123456"
                            className="text-center tracking-widest text-lg font-mono"
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg shadow-lg"
                            isLoading={loading}
                        >
                            Verificar Cuenta
                        </Button>
                    </form>
                </div>
                <div className="text-center">
                    <Link href="/login" className="text-text-secondary hover:text-primary text-sm">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
