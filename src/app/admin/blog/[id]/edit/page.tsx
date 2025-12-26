import prisma from '@/lib/db/prisma';
import PostForm from '../../PostForm';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif text-primary mb-8">Editar Artículo</h1>
            <PostForm post={post} isEditing={true} />
        </div>
    );
}
