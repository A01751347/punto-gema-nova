'use client';

import { useActionState, useState, useRef } from 'react';
import { createPost, updatePost } from '@/lib/blog/actions';
import { uploadImageAction } from '@/app/actions/upload-actions';
import Button from '@/components/ui/Button';
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

// Helper for type
type PostData = {
    id?: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    category?: string | null;
    featuredImage?: string | null;
    isPublished: boolean;
};

// Initial state for form
const initialState = {
    message: '',
    errors: {} as Record<string, string[]>,
    success: false,
};

interface PostFormProps {
    post?: PostData;
    isEditing?: boolean;
}

export default function PostForm({ post, isEditing = false }: PostFormProps) {
    // Determine which action to use
    // Since actions need to be bound if they take extra args, we handle that here?
    // createPost takes (prevState, formData). updatePost takes (id, prevState, formData).

    // We can wrap the update action
    const action = isEditing && post?.id
        ? updatePost.bind(null, post.id)
        : createPost;

    const [state, formAction, isPending] = useActionState(action, initialState);

    // Image Upload State
    const [imageUrl, setImageUrl] = useState(post?.featuredImage || '');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'blog');

        const result = await uploadImageAction(formData);

        if (result.success && result.url) {
            setImageUrl(result.url);
        } else {
            alert('Error subiendo imagen: ' + (result.error || 'Desconocido'));
        }
        setIsUploading(false);
    };

    return (
        <form action={formAction} className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/blog" className="text-gray-500 hover:text-primary flex items-center gap-2 transition-colors">
                    <ArrowLeft size={20} />
                    <span>Volver a Bitácora</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                            {state?.success ? 'Guardado' : (isEditing ? 'Publicado / Borrador' : 'Publicar inmediatamente')}
                        </label>
                        <input
                            type="checkbox"
                            name="isPublished"
                            defaultChecked={post?.isPublished ?? false}
                            className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                        />
                    </div>
                    <Button type="submit" isLoading={isPending} className="flex items-center gap-2 shadow-sm">
                        <Save size={18} />
                        {isEditing ? 'Actualizar' : 'Guardar Artículo'}
                    </Button>
                </div>
            </div>

            {state?.message && (
                <div className={`p-4 rounded-lg border ${state.success ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                    {state.message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título del Artículo</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={post?.title || ''}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-serif text-lg"
                                placeholder="Ej: Los beneficios del aceite de tuna"
                                required
                            />
                            {state?.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                defaultValue={post?.slug || ''}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-sm text-gray-600"
                                placeholder="ej: beneficios-aceite-tuna"
                            />
                            <p className="text-xs text-gray-400 mt-1">Déjalo vacío para generar automáticamente desde el título.</p>
                            {state?.errors?.slug && <p className="text-red-500 text-xs mt-1">{state.errors.slug[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido (Markdown)</label>
                            <div className="relative">
                                <textarea
                                    name="content"
                                    defaultValue={post?.content || ''}
                                    rows={15}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-sm leading-relaxed"
                                    placeholder="# Escribe tu artículo aquí..."
                                    required
                                />
                                <div className="absolute top-2 right-2 text-xs text-gray-300 font-mono pointer-events-none">MD</div>
                            </div>
                            {state?.errors?.content && <p className="text-red-500 text-xs mt-1">{state.errors.content[0]}</p>}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                        <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">Metadatos</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                            <select
                                name="category"
                                defaultValue={post?.category || ''}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Ciencia">Ciencia</option>
                                <option value="Rutinas">Rutinas</option>
                                <option value="Ingredientes">Ingredientes</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Noticias">Noticias</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resumen (Excerpt)</label>
                            <textarea
                                name="excerpt"
                                defaultValue={post?.excerpt || ''}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                placeholder="Breve descripción para las tarjetas..."
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                        <h3 className="font-medium text-gray-900 border-b border-gray-100 pb-2">Imagen Destacada</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Imagen</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="featuredImage"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="https://..."
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                                >
                                    {isUploading ? <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" /> : <Upload size={18} />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Sube una imagen o pega una URL externa.</p>
                        </div>

                        {imageUrl ? (
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl('')}
                                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500 shadow-sm"
                                >
                                    <ImageIcon size={16} className="rotate-45" /> {/* Using generic icon as 'X' or import X */}
                                </button>
                            </div>
                        ) : (
                            <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200 text-gray-300">
                                <ImageIcon size={32} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
