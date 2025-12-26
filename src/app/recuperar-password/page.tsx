'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { forgotPasswordAction, confirmForgotPasswordAction } from '@/app/actions/auth-actions';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<'request' | 'reset'>('request');

    // Form states
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI states
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRequestSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { success, error } = await forgotPasswordAction(email);
            if (success) {
                setStep('reset');
            } else {
                setError(error || 'No pudimos enviar el código. Verifica el correo.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (newPassword.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const { success, error } = await confirmForgotPasswordAction(email, code, newPassword);
            if (success) {
                setSuccess(true);
            } else {
                setError(error || 'Código incorrecto o expirado.');
            }
        } catch (err) {
            setError('Error al restablecer la contraseña.');
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
                    <h2 className="text-2xl font-serif text-text-primary">¡Contraseña Actualizada!</h2>
                    <p className="text-text-secondary">
                        Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva clave.
                    </p>
                    <Link href="/login">
                        <Button className="w-full">Ir a Iniciar Sesión</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-serif text-text-primary mb-2">Recuperar Contraseña</h1>
                    <p className="text-text-secondary">
                        {step === 'request'
                            ? 'Ingresa tu correo para recibir un código de recuperación'
                            : 'Ingresa el código enviado a tu correo y tu nueva contraseña'}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-soft-lg border border-gray-100">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2 mb-6">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {step === 'request' ? (
                        <form onSubmit={handleRequestSubmit} className="space-y-6">
                            <Input
                                label="Correo Electrónico"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                placeholder="nombre@ejemplo.com"
                            />
                            <Button type="submit" className="w-full h-12" isLoading={loading}>
                                Enviar Código
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetSubmit} className="space-y-6">
                            <Input
                                label="Correo Electrónico" // Read only confirmation
                                value={email}
                                disabled
                                fullWidth
                                className="bg-gray-50"
                            />
                            <Input
                                label="Código de Verificación"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                fullWidth
                                placeholder="123456"
                                className="text-center font-mono tracking-widest"
                            />
                            <Input
                                label="Nueva Contraseña"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                fullWidth
                            />
                            <Input
                                label="Confirmar Nueva Contraseña"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                fullWidth
                            />
                            <Button type="submit" className="w-full h-12" isLoading={loading}>
                                Cambiar Contraseña
                            </Button>
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep('request')}
                                    className="text-sm text-text-secondary hover:text-primary underline"
                                >
                                    Reenviar código
                                </button>
                            </div>
                        </form>
                    )}
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
