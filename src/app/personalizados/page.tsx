import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
    title: 'Piezas Personalizadas | Punto Gema Nova',
    description: 'Disena tu pieza unica. Iniciales, combinaciones especiales y ajustes de tamano.',
};

export default function PersonalizadosPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                        Hecho para Ti
                    </span>
                    <h1 className="text-4xl md:text-6xl mb-6">
                        Disena tu pieza unica
                    </h1>
                    <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                        Elige tu piedra, tu inicial, tu tamano. Creamos piezas personalizadas
                        que cuentan tu historia.
                    </p>
                </div>
            </section>

            {/* What Can Be Customized */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Opciones</span>
                    <h2 className="text-3xl mb-12">Que se puede personalizar?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100">
                        {[
                            {
                                title: 'Iniciales o Letras',
                                description: 'Agrega tu inicial o la de alguien especial en chapa de oro 18k.',
                            },
                            {
                                title: 'Combinacion de Piedras',
                                description: 'Elige las piedras que mas te gusten: cuarzo, amatista, jade, perlas.',
                            },
                            {
                                title: 'Ajuste de Tamano',
                                description: 'Ajustamos el largo de pulseras y collares a tu medida exacta.',
                            },
                            {
                                title: 'Materiales Especificos',
                                description: 'Elige entre chapa de oro 18k o plata .925 para los detalles.',
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 md:p-10">
                                <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">0{idx + 1}</span>
                                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-28 bg-cream">
                <div className="container mx-auto px-4 max-w-3xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Pasos</span>
                    <h2 className="text-3xl mb-12">Como Funciona</h2>

                    <div className="space-y-0">
                        {[
                            {
                                step: '01',
                                title: 'Elige tu base',
                                description: 'Selecciona si quieres una pulsera o un collar como base de tu pieza personalizada.',
                            },
                            {
                                step: '02',
                                title: 'Selecciona piedras y materiales',
                                description: 'Elige tus piedras favoritas y el tipo de metal (chapa de oro 18k o plata .925).',
                            },
                            {
                                step: '03',
                                title: 'Agrega tu personalizacion',
                                description: 'Indica tu inicial, nombre o ajuste de tamano. Nosotros nos encargamos del resto.',
                            },
                        ].map((item, i) => (
                            <div key={item.step} className={`flex gap-6 md:gap-10 items-start py-8 ${i < 2 ? 'border-b border-gray-200' : ''}`}>
                                <span className="text-3xl font-serif text-accent shrink-0 w-12">{item.step}</span>
                                <div>
                                    <h3 className="text-xl mb-2">{item.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing & Timeline */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Detalles</span>
                    <h2 className="text-3xl mb-10">Tiempo y Precio</h2>

                    <div className="grid grid-cols-3 gap-px bg-gray-100 mb-8">
                        {[
                            { value: 'Desde $750', label: 'MXN' },
                            { value: '5-7 dias', label: 'Elaboracion' },
                            { value: 'Unica', label: 'Pieza irrepetible' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white py-8 px-4">
                                <span className="text-2xl font-serif text-accent block mb-1">{item.value}</span>
                                <span className="text-xs text-text-light uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-text-light mb-10">
                        Las piezas personalizadas no aceptan devolucion, salvo defecto de fabricacion.
                    </p>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/tienda?category=personalizados">
                            <Button size="lg" className="h-12 px-8 text-sm tracking-wider uppercase">
                                Ver Piezas Personalizables
                            </Button>
                        </Link>
                        <a
                            href="https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20una%20pieza%20personalizada"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" variant="outline" className="h-12 px-8 text-sm tracking-wider uppercase">
                                WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
