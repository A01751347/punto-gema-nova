import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nuestro Proceso | Punto Gema Nova',
    description: 'Conoce el proceso artesanal detras de cada pieza de Punto Gema Nova.',
};

const steps = [
    {
        number: '01',
        title: 'Diseno',
        description: 'Cada pieza nace de una inspiracion: colores, texturas y formas de la naturaleza. Bocetamos y seleccionamos combinaciones que transmitan algo unico.',
    },
    {
        number: '02',
        title: 'Seleccion de Materiales',
        description: 'Elegimos piedras semipreciosas y materiales de calidad, uno por uno. Cada cuarzo, cada perla, cada pieza de chapa de oro es revisada antes de ser utilizada.',
    },
    {
        number: '03',
        title: 'Elaboracion Artesanal',
        description: 'Cada pieza es ensamblada a mano con dedicacion y cuidado. El proceso toma tiempo porque no hay produccion en serie — cada joya es individual.',
    },
    {
        number: '04',
        title: 'Control de Calidad',
        description: 'Revisamos cada detalle antes de empacar tu pieza: acabados, resistencia de cierres, brillo de las piedras. Solo lo mejor sale de nuestras manos.',
    },
];

export default function ProcesoPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                        Como Trabajamos
                    </span>
                    <h1 className="text-4xl md:text-6xl mb-6">
                        Nuestro Proceso
                    </h1>
                    <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                        Del diseno a tus manos. Cuatro pasos que garantizan calidad y autenticidad en cada pieza.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-0">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 ${index < steps.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                <div className="md:col-span-2">
                                    <span className="text-4xl font-serif text-accent">{step.number}</span>
                                </div>
                                <div className="md:col-span-4">
                                    <h2 className="text-2xl">{step.title}</h2>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="text-text-secondary leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
