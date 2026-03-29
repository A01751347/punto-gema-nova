import { getPostBySlug } from '@/lib/blog/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="bg-white min-h-screen pt-8 pb-20">
            {/* Detailed SEO Metadata would go here */}

            <div className="container mx-auto max-w-4xl px-4">
                {/* Breadcrumbs */}
                <div className="mb-8">
                    <Breadcrumbs
                        items={[
                            { label: 'Blog', href: '/blog' },
                            { label: post.title, href: `/blog/${slug}` }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-6">
                        <span>{post.category || 'General'}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{new Date(post.publishedAt || Date.now()).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight mb-8">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-text-secondary font-light leading-relaxed max-w-2xl mx-auto">
                            {post.excerpt}
                        </p>
                    )}
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-16 shadow-lg">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#1a1a1a] prose-p:text-text-secondary prose-p:font-light prose-p:leading-loose prose-a:text-[#d4af37] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                        <ReactMarkdown>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Share Section */}
                    <div className="border-t border-gray-100 mt-16 pt-8 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Compartir artículo</span>
                        <div className="flex gap-4">
                            <button aria-label="Share on Facebook" className="p-2 text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook size={20} /></button>
                            <button aria-label="Share on Twitter" className="p-2 text-gray-400 hover:text-[#1DA1F2] transition-colors"><Twitter size={20} /></button>
                            <button aria-label="Share on LinkedIn" className="p-2 text-gray-400 hover:text-[#0A66C2] transition-colors"><Linkedin size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
