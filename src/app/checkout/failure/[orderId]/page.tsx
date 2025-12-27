'use client';

import { use } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { XCircle, AlertCircle } from 'lucide-react';

interface FailurePageProps {
    params: Promise<{
        orderId: string;
    }>;
}

export default function FailurePage({ params }: FailurePageProps) {
    const { orderId } = use(params);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">

                {/* Failure Icon */}
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-in fade-in zoom-in duration-300">
                    <XCircle className="w-12 h-12 text-red-500" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-serif text-gray-900">
                        ¡Ups! Algo salió mal
                    </h1>
                    <p className="text-gray-500 font-light text-lg px-4">
                        Tu pago no pudo ser procesado o fue cancelado. No se ha realizado ningún cargo a tu cuenta.
                    </p>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3 text-left">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-red-800">Sugerencias:</p>
                        <ul className="text-sm text-red-700/80 list-disc list-inside mt-1 space-y-1">
                            <li>Revisa que tengas fondos suficientes.</li>
                            <li>Intenta con otra tarjeta o método de pago.</li>
                            <li>Contacta a tu banco si el problema persiste.</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-4 space-y-3">
                    <Link href="/checkout">
                        <Button className="w-full h-12 bg-primary text-white hover:bg-primary/90 shadow-md">
                            Intentar Nuevamente
                        </Button>
                    </Link>
                    <Link href="/carrito">
                        <Button variant="outline" className="w-full h-12 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                            Volver al Carrito
                        </Button>
                    </Link>
                </div>

                <p className="text-xs text-gray-400 mt-6">
                    Referencia de pedido: {orderId}
                </p>
            </div>
        </div>
    );
}
