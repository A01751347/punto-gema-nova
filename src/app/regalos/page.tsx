import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
    title: 'Regalos | Punto Gema Nova',
    description: 'El regalo perfecto para alguien especial. Joyería artesanal con empaque de regalo.',
};

export default function RegalosPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-20 md:py-28 bg-cream-light text-center">
                <div className="container mx-auto px-4">
                    <span className="text-sm font-bold tracking-widest text-primary/60 uppercase block mb-4">
                        Ideas para Regalar
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
                        El regalo perfecto
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
                        Porque regalar joyería artesanal es regalar algo con significado.
                        Cada pieza llega en un empaque elegante, lista para sorprender.
                    </p>
                </div>
            </section>

            {/* Gift Packaging */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-serif text-text-primary mb-8 text-center">
                            Empaque Especial
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-cream-light rounded-xl">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-text-primary mb-2">Caja de Presentación</h3>
                                <p className="text-sm text-text-secondary font-light">
                                    Caja elegante con interior acolchado que protege tu pieza y luce increíble al abrir.
                                </p>
                            </div>
                            <div className="text-center p-6 bg-cream-light rounded-xl">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-text-primary mb-2">Bolsa de Tela</h3>
                                <p className="text-sm text-text-secondary font-light">
                                    Incluimos una bolsa de tela suave para guardar la pieza cuando no se use.
                                </p>
                            </div>
                            <div className="text-center p-6 bg-cream-light rounded-xl">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-text-primary mb-2">Nota Personalizada</h3>
                                <p className="text-sm text-text-secondary font-light">
                                    Agrega un mensaje en las notas de tu pedido y lo incluimos escrito a mano.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ideas by Budget */}
            <section className="py-16 md:py-24 bg-cream-light/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-text-primary mb-12 text-center">
                        Ideas por Presupuesto
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-xl border border-cream shadow-sm text-center">
                            <span className="text-3xl font-serif text-accent mb-2 block">Hasta $700</span>
                            <h3 className="font-medium text-text-primary mb-4">Pulseras Individuales</h3>
                            <p className="text-sm text-text-secondary font-light mb-6">
                                Pulseras artesanales con piedras naturales. Perfectas para un detalle con significado.
                            </p>
                            <Link href="/tienda?category=pulseras&priceMax=700">
                                <Button variant="outline" size="sm">Ver opciones</Button>
                            </Link>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-accent/30 shadow-md text-center relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                                Más Popular
                            </span>
                            <span className="text-3xl font-serif text-accent mb-2 block">$700 - $1,000</span>
                            <h3 className="font-medium text-text-primary mb-4">Collares y Pulseras Premium</h3>
                            <p className="text-sm text-text-secondary font-light mb-6">
                                Piezas con más detalle y materiales premium. Un regalo que impresiona.
                            </p>
                            <Link href="/tienda?priceMin=700&priceMax=1000">
                                <Button size="sm">Ver opciones</Button>
                            </Link>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-cream shadow-sm text-center">
                            <span className="text-3xl font-serif text-accent mb-2 block">+$1,000</span>
                            <h3 className="font-medium text-text-primary mb-4">Sets y Piezas Personalizadas</h3>
                            <p className="text-sm text-text-secondary font-light mb-6">
                                Conjuntos completos o piezas hechas a medida. El regalo más especial.
                            </p>
                            <Link href="/tienda?category=sets">
                                <Button variant="outline" size="sm">Ver opciones</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 text-center">
                <div className="container mx-auto px-4 space-y-6">
                    <h2 className="text-3xl font-serif text-text-primary">
                        ¿No sabes qué elegir?
                    </h2>
                    <p className="text-text-secondary font-light max-w-lg mx-auto">
                        Toma nuestro quiz de estilo y descubre qué pieza es perfecta para la persona que quieres sorprender.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/quiz">
                            <Button size="lg">Hacer el Quiz</Button>
                        </Link>
                        <Link href="/tienda?category=sets">
                            <Button size="lg" variant="outline">Ver Sets para Regalar</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
