import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
    title: 'Regalos | Punto Gema Nova',
    description: 'El regalo perfecto para alguien especial. Joyeria artesanal con empaque de regalo.',
};

export default function RegalosPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                        Ideas para Regalar
                    </span>
                    <h1 className="text-4xl md:text-6xl mb-6">
                        El regalo perfecto
                    </h1>
                    <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                        Porque regalar joyeria artesanal es regalar algo con significado.
                        Cada pieza llega en un empaque elegante, lista para sorprender.
                    </p>
                </div>
            </section>

            {/* Gift Packaging */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Incluido</span>
                    <h2 className="text-3xl mb-12">Empaque Especial</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100">
                        {[
                            {
                                title: 'Caja de Presentacion',
                                text: 'Caja elegante con interior acolchado que protege tu pieza y luce increible al abrir.',
                            },
                            {
                                title: 'Bolsa de Tela',
                                text: 'Incluimos una bolsa de tela suave para guardar la pieza cuando no se use.',
                            },
                            {
                                title: 'Nota Personalizada',
                                text: 'Agrega un mensaje en las notas de tu pedido y lo incluimos escrito a mano.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 md:p-10">
                                <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-5">0{i + 1}</span>
                                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ideas by Budget */}
            <section className="py-20 md:py-28 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Presupuesto</span>
                    <h2 className="text-3xl mb-12">Ideas por Precio</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                price: 'Hasta $700',
                                title: 'Pulseras Individuales',
                                text: 'Pulseras artesanales con piedras naturales. Perfectas para un detalle con significado.',
                                href: '/tienda?category=pulseras&priceMax=700',
                                featured: false,
                            },
                            {
                                price: '$700 — $1,000',
                                title: 'Collares y Pulseras Premium',
                                text: 'Piezas con mas detalle y materiales premium. Un regalo que impresiona.',
                                href: '/tienda?priceMin=700&priceMax=1000',
                                featured: true,
                            },
                            {
                                price: '+$1,000',
                                title: 'Sets y Personalizadas',
                                text: 'Conjuntos completos o piezas hechas a medida. El regalo mas especial.',
                                href: '/tienda?category=sets',
                                featured: false,
                            },
                        ].map((tier, i) => (
                            <div key={i} className={`p-8 ${tier.featured ? 'bg-primary text-white' : 'bg-white'}`}>
                                <span className={`text-2xl font-serif block mb-1 ${tier.featured ? 'text-accent' : 'text-accent'}`}>{tier.price}</span>
                                <h3 className={`text-lg font-medium mb-3 ${tier.featured ? 'text-white' : ''}`}>{tier.title}</h3>
                                <p className={`text-sm leading-relaxed mb-6 ${tier.featured ? 'text-white/70' : 'text-text-secondary'}`}>
                                    {tier.text}
                                </p>
                                <Link href={tier.href}>
                                    <Button
                                        variant={tier.featured ? 'outline' : 'outline'}
                                        size="sm"
                                        className={tier.featured ? 'border-accent text-accent hover:bg-accent hover:text-white' : ''}
                                    >
                                        Ver opciones
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28 text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl mb-4">No sabes que elegir?</h2>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                        Toma nuestro quiz de estilo y descubre que pieza es perfecta para la persona que quieres sorprender.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/quiz">
                            <Button size="lg" className="h-12 px-8 text-sm tracking-wider uppercase">Hacer el Quiz</Button>
                        </Link>
                        <Link href="/tienda?category=sets">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-sm tracking-wider uppercase">Ver Sets</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
