import { getMaterialBySlug } from '@/lib/materials/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function MaterialDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const material = await getMaterialBySlug(slug);

    if (!material) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#f8f9fa] border-b border-gray-100">
                <div className="container mx-auto max-w-5xl px-4 py-8">
                    <Link href="/materiales" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1a1a1a] transition-colors mb-8">
                        <ArrowLeft size={16} className="mr-2" /> Volver a Materiales
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
                                {material.name}
                            </h1>
                            <p className="text-lg text-text-secondary font-light leading-relaxed mb-6">
                                {material.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {material.benefits.map((benefit, idx) => (
                                    <span key={idx} className="bg-[#1a1a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="space-y-4">
                                {material.type && (
                                    <div>
                                        <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Tipo</span>
                                        <p className="font-mono text-[#1a1a1a]">{material.type}</p>
                                    </div>
                                )}
                                {material.type && material.origin && <div className="h-px bg-gray-100" />}
                                {material.origin && (
                                    <div>
                                        <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Origen</span>
                                        <p className="font-serif text-[#1a1a1a]">{material.origin}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-16 space-y-16">
                {/* Related Products */}
                {material.products.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-8 flex items-center gap-2">
                            <Sparkles size={24} className="text-[#d4af37]" />
                            Piezas con este material
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {material.products.map(({ product }) => (
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
                                            <h4 className="font-medium text-[#1a1a1a] group-hover:text-[#d4af37] transition-colors">{product.name}</h4>
                                            <span className="text-xs text-gray-400">Ver pieza →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
