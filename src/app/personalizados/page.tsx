import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
    title: 'Piezas Personalizadas | Punto Gema Nova',
    description: 'Diseña tu pieza única. Iniciales, combinaciones especiales y ajustes de tamaño.',
};

export default function PersonalizadosPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-20 md:py-28 bg-cream-light text-center">
                <div className="container mx-auto px-4">
                    <span className="text-sm font-bold tracking-widest text-primary/60 uppercase block mb-4">
                        Hecho para Ti
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
                        Diseña tu pieza única
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
                        Elige tu piedra, tu inicial, tu tamaño. Creamos piezas personalizadas
                        que cuentan tu historia.
                    </p>
                </div>
            </section>

            {/* What Can Be Customized */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-text-primary mb-12 text-center">
                        ¿Qué se puede personalizar?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                title: 'Iniciales o Letras',
                                description: 'Agrega tu inicial o la de alguien especial en chapa de oro 18k.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Combinación de Piedras',
                                description: 'Elige las piedras que más te gusten: cuarzo, amatista, jade, perlas.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Ajuste de Tamaño',
                                description: 'Ajustamos el largo de pulseras y collares a tu medida exacta.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Materiales Específicos',
                                description: 'Elige entre chapa de oro 18k o plata .925 para los detalles.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.384 3.03 1.03-5.996L2.13 7.46l6.017-.875L11.42.96l2.693 5.625 6.017.875-4.936 4.744 1.03 5.996-5.384-3.03z" />
                                    </svg>
                                ),
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-cream-light p-6 rounded-xl text-center">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="font-medium text-text-primary mb-2">{item.title}</h3>
                                <p className="text-sm text-text-secondary font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 md:py-24 bg-cream-light/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-text-primary mb-12 text-center">
                        Cómo Funciona
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            {
                                step: '1',
                                title: 'Elige tu base',
                                description: 'Selecciona si quieres una pulsera o un collar como base de tu pieza personalizada.',
                            },
                            {
                                step: '2',
                                title: 'Selecciona piedras y materiales',
                                description: 'Elige tus piedras favoritas y el tipo de metal (chapa de oro 18k o plata .925).',
                            },
                            {
                                step: '3',
                                title: 'Agrega tu personalización',
                                description: 'Indica tu inicial, nombre o ajuste de tamaño. Nosotros nos encargamos del resto.',
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xl font-serif">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-text-primary mb-1">{item.title}</h3>
                                    <p className="text-text-secondary font-light">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing & Timeline */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-cream-light p-8 md:p-12 rounded-2xl text-center">
                        <h2 className="text-3xl font-serif text-text-primary mb-6">
                            Tiempo y Precio
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            <div>
                                <p className="text-2xl font-serif text-accent">Desde $750</p>
                                <p className="text-sm text-text-secondary mt-1">MXN</p>
                            </div>
                            <div>
                                <p className="text-2xl font-serif text-accent">5-7 días</p>
                                <p className="text-sm text-text-secondary mt-1">De elaboración</p>
                            </div>
                            <div>
                                <p className="text-2xl font-serif text-accent">Única</p>
                                <p className="text-sm text-text-secondary mt-1">Pieza irrepetible</p>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary mb-8 font-light">
                            Nota: las piezas personalizadas no aceptan devolución, salvo defecto de fabricación.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href="/tienda?category=personalizados">
                                <Button size="lg">Ver Piezas Personalizables</Button>
                            </Link>
                            <a
                                href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20una%20pieza%20personalizada"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" variant="outline">Contactar por WhatsApp</Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
