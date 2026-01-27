import type { Metadata } from 'next';
import Link from 'next/link';
import { getIngredients } from '@/lib/ingredients/actions';
import { FlaskConical, Leaf, Microscope } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Glosario de Ingredientes | Yutnüu',
    description: 'Transparencia radical. Conoce cada activo que toca tu piel, su origen y su función científica.',
};

export default async function IngredientsPage() {
    const ingredients = await getIngredients();

    return (
        <main className="bg-white min-h-screen pt-0 pb-20">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 px-4 text-center">
                <div className="container mx-auto max-w-4xl">
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Ciencia Botánica
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">
                        Glosario de Ingredientes
                    </h1>
                    <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
                        Decodificamos nuestras entiquetas. Sin secretos, solo activos potentes con respaldo científico.
                    </p>
                </div>
            </section>

            {/* List */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    {ingredients.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl">
                            <FlaskConical size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg font-serif">Aún estamos catalogando nuestra librería botánica.</p>
                            <p className="text-sm text-gray-400 mt-2">Vuelve pronto para explorar nuestros activos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ingredients.map((ing) => (
                                <Link href={`/ingredientes/${ing.slug}`} key={ing.id} className="group">
                                    <div className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-white hover:border-[#d4af37]/30">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-[#d4af37] font-mono text-sm tracking-wider uppercase border border-[#d4af37]/20 px-2 py-1 rounded">
                                                {ing.typicalConcentration || 'Activo'}
                                            </span>
                                            <Leaf size={20} className="text-[#2c4a52] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        <h2 className="text-2xl font-serif text-[#2c4a52] mb-3 group-hover:text-[#d4af37] transition-colors">
                                            {ing.name}
                                        </h2>

                                        <p className="text-text-secondary font-light text-sm line-clamp-3 mb-6 flex-grow">
                                            {ing.description}
                                        </p>

                                        {ing.benefits.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {ing.benefits.slice(0, 3).map((benefit, idx) => (
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
