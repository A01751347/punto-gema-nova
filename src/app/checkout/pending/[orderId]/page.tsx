'use client';

import { useEffect, use } from 'react';
import { useCart } from '@/lib/cart/CartContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Clock, Info } from 'lucide-react';

interface PendingPageProps {
    params: Promise<{
        orderId: string;
    }>;
}

export default function PendingPage({ params }: PendingPageProps) {
    const { clearCart } = useCart();
    const { orderId } = use(params);

    useEffect(() => {
        // Clear the cart as the order is placed and awaiting payment
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">

                {/* Pending Icon */}
                <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Clock className="w-12 h-12 text-yellow-600" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-serif text-gray-900">
                        Pago en Proceso
                    </h1>
                    <p className="text-gray-500 font-light text-lg px-2">
                        Tu orden ha sido generada. Estamos esperando la confirmación de tu pago.
                    </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 text-left">
                    <div className="flex gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">Pagos en Efectivo (OXXO/7-Eleven)</p>
                            <p className="text-sm text-blue-700/80 leading-relaxed">
                                Recuerda realizar tu deposito antes de la fecha de vencimiento indicada en tu boleta de pago.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Número de Orden</p>
                    <p className="text-xl font-mono text-gray-900 font-medium select-all">
                        {orderId}
                    </p>
                </div>

                <div className="pt-4 space-y-3">
                    <Link href="/tienda">
                        <Button className="w-full h-12 bg-primary text-white hover:bg-primary/90 shadow-md">
                            Seguir Comprando
                        </Button>
                    </Link>
                    <Link href="/cuenta/pedidos">
                        <Button variant="outline" className="w-full h-12 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                            Ver Mis Pedidos
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
