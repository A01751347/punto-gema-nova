import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog/actions';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Bitácora | Yutnüu',
    description: 'Reflexiones sobre botánica, dermatología y el arte de vivir lento. Artículos de expertos y noticias de la marca.',
};

export default async function BlogPage() {
    // Fetch data from DB
    const posts = await getPublishedPosts(10);

    // Separate Featured vs Grid
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const gridPosts = posts.length > 0 ? posts.slice(1) : [];

    return (
        <main className="bg-white min-h-screen pt-0 pb-20">

            {/* Header */}
            <section className="px-4 py-16 md:py-24 text-center">
                <div className="container mx-auto max-w-4xl">
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Nuestro Journal
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-[#2c4a52] mb-6">
                        Bitácora Yutnüu
                    </h1>
                    <p className="text-lg text-text-secondary font-light max-w-xl mx-auto">
                        Un espacio para explorar la intersección entre la ciencia moderna y la sabiduría ancestral.
                    </p>
                </div>
            </section>

            {/* Featured Article */}
            {featuredPost && (
                <section className="px-4 pb-16">
                    <Link href={`/blog/${featuredPost.slug}`}>
                        <div className="container bg-cream-light mx-auto max-w-6xl rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex flex-col md:flex-row min-h-[500px]">
                                <div className="md:w-1/2 bg-[#2c4a52] relative overflow-hidden">
                                    {featuredPost.featuredImage ? (
                                        <Image
                                            src={featuredPost.featuredImage}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-9xl font-serif">Y</div>
                                    )}
                                </div>
                                <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4">
                                        <span>{featuredPost.category || 'Editorial'}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{new Date(featuredPost.publishedAt || Date.now()).toLocaleDateString('es-MX', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-serif text-[#2c4a52] mb-6 group-hover:text-[#d4af37] transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-text-secondary font-light leading-relaxed mb-8 text-lg">
                                        {featuredPost.excerpt}
                                    </p>

                                    <span className="text-sm font-bold text-[#2c4a52] border-b border-[#2c4a52] self-start pb-1">
                                        Leer Artículo Completo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Articles Grid */}
            <section className="px-4 pb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {gridPosts.map((article) => (
                            <Link href={`/blog/${article.slug}`} key={article.id} className="group cursor-pointer">
                                <div className={`aspect-[16/9] rounded-2xl mb-6 overflow-hidden bg-gray-100 relative`}>
                                    {article.featuredImage ? (
                                        <Image
                                            src={article.featuredImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-primary/20 text-4xl">Y</div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-3">
                                    <span className="text-[#d4af37]">{article.category || 'General'}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-400">{new Date(article.publishedAt || Date.now()).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}</span>
                                </div>

                                <h3 className="text-2xl font-serif text-[#2c4a52] mb-3 leading-tight group-hover:text-[#d4af37] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-text-secondary font-light text-sm leading-relaxed mb-4 line-clamp-2">
                                    {article.excerpt}
                                </p>
                                <span className="text-xs font-bold text-[#2c4a52] uppercase tracking-wide group-hover:underline">
                                    Leer más
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
