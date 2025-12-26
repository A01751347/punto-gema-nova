import Link from 'next/link';
import { getAllPosts } from '@/lib/blog/actions';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import DeleteButton from './DeleteButton'; // We will create this next

export default async function AdminBlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-primary">Bitácora (Blog)</h1>
                    <p className="text-text-secondary">Gestiona los artículos y publicaciones</p>
                </div>
                <Link href="/admin/blog/new" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
                    <Plus size={20} />
                    <span>Nuevo Artículo</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-medium text-text-secondary text-sm">Título</th>
                            <th className="px-6 py-4 font-medium text-text-secondary text-sm">Estado</th>
                            <th className="px-6 py-4 font-medium text-text-secondary text-sm">Categoría</th>
                            <th className="px-6 py-4 font-medium text-text-secondary text-sm">Fecha</th>
                            <th className="px-6 py-4 font-medium text-text-secondary text-sm text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-text-primary">{post.title}</div>
                                    <div className="text-xs text-text-secondary text-light truncate max-w-xs">
                                        /{post.slug}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${post.isPublished
                                            ? 'bg-green-50 text-green-700 border-green-100'
                                            : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                                        }`}>
                                        {post.isPublished ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-text-secondary text-sm">
                                    {post.category || '-'}
                                </td>
                                <td className="px-6 py-4 text-text-secondary text-sm">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                                            title="Ver en vivo"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <Link
                                            href={`/admin/blog/${post.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteButton id={post.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-3 bg-gray-50 rounded-full">
                                            <FileText size={32} className="text-gray-300" />
                                        </div>
                                        <p>No hay artículos creados aún.</p>
                                        <Link href="/admin/blog/new" className="text-primary hover:underline text-sm font-medium">
                                            Crear el primero
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
