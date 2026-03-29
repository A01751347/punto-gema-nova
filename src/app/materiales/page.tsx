import type { Metadata } from 'next';
import Link from 'next/link';
import { getMaterials } from '@/lib/materials/actions';
import { Gem, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Nuestros Materiales | Punto Gema Nova',
    description: 'Conoce las piedras y materiales con los que elaboramos cada pieza de Punto Gema Nova.',
};

export default async function MaterialesPage() {
    const materials = await getMaterials();

    return (
        <main className="bg-white min-h-screen pt-0 pb-20">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 px-4 text-center">
                <div className="container mx-auto max-w-4xl">
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Materiales
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">
                        Nuestros Materiales
                    </h1>
                    <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
                        Conoce las piedras y materiales con los que elaboramos cada pieza.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    {materials.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl">
                            <Gem size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg font-serif">Pronto catalogaremos nuestros materiales.</p>
                            <p className="text-sm text-gray-400 mt-2">Vuelve pronto para conocerlos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {materials.map((material) => (
                                <Link href={`/materiales/${material.slug}`} key={material.id} className="group">
                                    <div className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-white hover:border-[#d4af37]/30">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-[#d4af37] font-mono text-sm tracking-wider uppercase border border-[#d4af37]/20 px-2 py-1 rounded">
                                                {material.type || 'Material'}
                                            </span>
                                            <Sparkles size={20} className="text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3 group-hover:text-[#d4af37] transition-colors">
                                            {material.name}
                                        </h2>

                                        <p className="text-text-secondary font-light text-sm line-clamp-3 mb-4 flex-grow">
                                            {material.description}
                                        </p>

                                        {material.origin && (
                                            <p className="text-xs text-gray-400 mb-4">
                                                Origen: {material.origin}
                                            </p>
                                        )}

                                        {material.benefits.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {material.benefits.slice(0, 3).map((benefit, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md">
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
