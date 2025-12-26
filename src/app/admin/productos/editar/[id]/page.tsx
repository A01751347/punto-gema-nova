'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { getProductByIdAction, updateProductAction } from '@/app/actions/admin/product-actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function EditProductPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Extended Form Data
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        sku: '',
        size: '',
        description: '',
        benefits: '',
        howToUse: '',
        mechanism: '',
        suitableFor: '',
        whenToUse: '',
        isActive: true,
        images: [] as string[]
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (user?.email && params.id) {
                const { success, product } = await getProductByIdAction(user.email, params.id as string);
                if (success && product) {
                    setFormData({
                        name: product.name,
                        price: product.price.toString(),
                        stock: product.stock.toString(),
                        sku: product.sku || '',
                        size: product.size || '',
                        description: product.description || '',
                        benefits: product.benefits ? product.benefits.join(', ') : '',
                        howToUse: product.howToUse || '',
                        mechanism: product.mechanism || '',
                        suitableFor: product.suitableFor ? product.suitableFor.join(', ') : '',
                        whenToUse: product.whenToUse || '',
                        isActive: product.isActive,
                        images: product.images || []
                    });
                }
            }
            setIsFetching(false);
        };
        fetchProduct();
    }, [user, params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // @ts-ignore
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.email || !params.id) return;

        setIsLoading(true);

        const data = new FormData(e.currentTarget);
        // Add checkboxes manually as they might be unchecked
        data.set('isActive', formData.isActive.toString());

        const { success, error } = await updateProductAction(user.email, params.id as string, data);

        if (success) {
            router.push('/admin/productos');
        } else {
            alert(error || 'Failed to update product');
        }
        setIsLoading(false);
    };

    if (isFetching) return <div className="p-8 text-gray-400">Cargando...</div>;

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <Link href="/admin/productos" className="hover:text-primary">Productos</Link>
                <span>/</span>
                <span>Editar</span>
            </div>

            <h1 className="text-2xl font-serif text-gray-800 mb-8">Editar Producto</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <Input label="Nombre" name="name" required value={formData.name} onChange={handleChange} fullWidth />

                <div className="grid grid-cols-2 gap-4">
                    <Input label="SKU" name="sku" required value={formData.sku} onChange={handleChange} fullWidth />
                    <Input label="Tamaño" name="size" required value={formData.size} onChange={handleChange} fullWidth />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Precio ($)" name="price" type="number" step="0.01" required value={formData.price} onChange={handleChange} fullWidth />
                    <Input label="Stock" name="stock" type="number" required value={formData.stock} onChange={handleChange} fullWidth />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                        name="description"
                        rows={3}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles Avanzados</h3>

                    <div className="space-y-4">
                        <Input
                            label="Beneficios Clave (separados por coma)"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Input
                            label="Tipos de Piel (separados por coma)"
                            name="suitableFor"
                            value={formData.suitableFor}
                            onChange={handleChange}
                            fullWidth
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Modo de Uso</label>
                                <textarea
                                    name="howToUse"
                                    rows={3}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    value={formData.howToUse}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mecanismo</label>
                                <textarea
                                    name="mechanism"
                                    rows={3}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    value={formData.mechanism}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <Input
                            label="Momento de Uso"
                            name="whenToUse"
                            value={formData.whenToUse}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes del Producto</label>

                    {/* Existing Images Preview */}
                    {formData.images && formData.images.length > 0 && (
                        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 group">
                                    <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    <label className="block text-sm font-medium text-gray-700 mb-2">Agregar Nueva Imagen</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary-light/80"
                    />
                    <p className="text-xs text-gray-400 mt-1">Subir una nueva imagen se agregará a la galería.</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                        Producto Activo (Visible en tienda)
                    </label>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/admin/productos">
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>Guardar Cambios</Button>
                </div>
            </form>
        </div>
    );
}
