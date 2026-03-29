import type { Metadata } from 'next';
import Link from 'next/link';
import { getMaterials } from '@/lib/materials/actions';

export const metadata: Metadata = {
    title: 'Nuestros Materiales | Punto Gema Nova',
    description: 'Conoce las piedras y materiales con los que elaboramos cada pieza de Punto Gema Nova.',
};

export default async function MaterialesPage() {
    const materials = await getMaterials();

    return (
        <main className="bg-white min-h-screen">
            {/* Hero */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-4 max-w-4xl">
                    <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                        Materiales
                    </span>
                    <h1 className="text-4xl md:text-6xl mb-6">
                        Nuestros Materiales
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                        Conoce las piedras y materiales con los que elaboramos cada pieza.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-6xl">
                    {materials.length === 0 ? (
                        <div className="text-center py-20 border border-gray-100">
                            <p className="text-text-secondary text-lg font-serif">Pronto catalogaremos nuestros materiales.</p>
                            <p className="text-sm text-text-light mt-2">Vuelve pronto para conocerlos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
                            {materials.map((material) => (
                                <Link href={`/materiales/${material.slug}`} key={material.id} className="group">
                                    <div className="bg-white p-8 md:p-10 h-full flex flex-col hover:bg-cream transition-colors duration-300">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-xs tracking-[0.2em] uppercase text-accent">
                                                {material.type || 'Material'}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-serif mb-3 group-hover:text-accent transition-colors">
                                            {material.name}
                                        </h2>

                                        <p className="text-text-secondary text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                                            {material.description}
                                        </p>

                                        {material.origin && (
                                            <p className="text-xs text-text-light mb-4">
                                                Origen: {material.origin}
                                            </p>
                                        )}

                                        {material.benefits.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {material.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                                                    <span key={idx} className="text-xs bg-cream text-text-secondary px-2 py-1">
                                                        {benefit}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
