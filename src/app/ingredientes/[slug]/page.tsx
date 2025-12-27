import { getIngredientBySlug } from '@/lib/ingredients/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Beaker, ShieldAlert, Sparkles } from 'lucide-react';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function IngredientDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const ingredient = await getIngredientBySlug(slug);

    if (!ingredient) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#f8f9fa] border-b border-gray-100">
                <div className="container mx-auto max-w-5xl px-4 py-8">
                    <Link href="/ingredientes" className="inline-flex items-center text-sm text-gray-500 hover:text-[#2c4a52] transition-colors mb-8">
                        <ArrowLeft size={16} className="mr-2" /> Volver al Glosario
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-serif text-[#2c4a52] mb-4">
                                {ingredient.name}
                            </h1>
                            <p className="text-lg text-text-secondary font-light leading-relaxed mb-6">
                                {ingredient.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {ingredient.benefits.map((benefit, idx) => (
                                    <span key={idx} className="bg-[#2c4a52] text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Concentración</span>
                                    <p className="font-mono text-[#2c4a52]">{ingredient.typicalConcentration || 'Variable'}</p>
                                </div>
                                <div className="h-px bg-gray-100" />
                                <div>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Origen</span>
                                    <p className="font-serif text-[#2c4a52]">Natural / Botánico</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-16 space-y-16">

                {/* Precautions */}
                {ingredient.precautions && (
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex gap-4 items-start">
                        <ShieldAlert className="text-orange-400 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-orange-900 mb-1">Precauciones</h3>
                            <p className="text-sm text-orange-800/80">{ingredient.precautions}</p>
                        </div>
                    </div>
                )}

                {/* Products containing this */}
                {ingredient.products.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-serif text-[#2c4a52] mb-8 flex items-center gap-2">
                            <Sparkles size={24} className="text-[#d4af37]" />
                            Encuéntralo en
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ingredient.products.map(({ product }) => (
                                <Link href={`/tienda/${product.slug}`} key={product.id} className="group">
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#d4af37]/30 hover:shadow-lg transition-all">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                                            {product.images[0] && (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-[#2c4a52] group-hover:text-[#d4af37] transition-colors">{product.name}</h4>
                                            <span className="text-xs text-gray-400">Ver producto →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Scientific References */}
                {ingredient.references && ingredient.references.length > 0 && (
                    <section className="border-t border-gray-100 pt-16">
                        <h2 className="text-xl font-serif text-gray-400 mb-8 flex items-center gap-2">
                            <Beaker size={20} />
                            Respaldo Científico
                        </h2>
                        <ul className="space-y-4">
                            {ingredient.references.map(({ reference }) => (
                                <li key={reference.id} className="text-sm text-gray-500 pl-4 border-l-2 border-gray-200">
                                    <p className="font-medium text-gray-700">{reference.title}</p>
                                    <p className="italic mt-1">{reference.summary}</p>
                                    {reference.url && (
                                        <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline mt-1 inline-block">
                                            Leer publicación
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </main>
    );
}
