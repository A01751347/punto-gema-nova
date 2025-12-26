'use client';

import { useEffect, use } from 'react';
import { useCart } from '@/lib/cart/CartContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface SuccessPageProps {
    params: Promise<{
        orderId: string;
    }>;
}

export default function SuccessPage({ params }: SuccessPageProps) {
    const { clearCart } = useCart();
    const { orderId } = use(params);

    useEffect(() => {
        // Clear the cart on successful load of this page
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Success Icon */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl font-serif text-text-primary">
                    ¡Gracias por tu compra!
                </h1>

                <p className="text-text-secondary font-light text-lg">
                    Tu pedido ha sido confirmado. Hemos enviado un correo con los detalles.
                </p>

                <div className="bg-cream-light p-6 rounded-xl border border-primary/10">
                    <p className="text-sm text-text-secondary uppercase tracking-widest mb-2">Número de Orden</p>
                    <p className="text-2xl font-mono text-primary font-medium select-all">
                        {orderId}
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/tienda">
                        <Button className="w-full h-12 shadow-lg">
                            Seguir Comprando
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
