'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { createProductAction } from '@/app/actions/admin/product-actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function NewProductPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Simple state management for form
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        stock: '',
        size: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.email) return;

        setIsLoading(true);

        const data = new FormData(e.currentTarget); // Use native FormData from event
        // It automatically gathers 'name', 'price', 'image', etc. from inputs with name tags

        const { success, error } = await createProductAction(user.email, data);

        if (success) {
            router.push('/admin/productos');
        } else {
            alert(error || 'Failed to create product');
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <Link href="/admin/productos" className="hover:text-primary">Productos</Link>
                <span>/</span>
                <span>Nuevo</span>
            </div>

            <h1 className="text-2xl font-serif text-gray-800 mb-8">Nuevo Producto</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <Input
                    label="Nombre del Producto"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="SKU"
                        name="sku"
                        required
                        value={formData.sku}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Input
                        label="Tamaño (ej. 50ml)"
                        name="size"
                        required
                        value={formData.size}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Precio ($)"
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Input
                        label="Stock Inicial"
                        name="stock"
                        type="number"
                        required
                        value={formData.stock}
                        onChange={handleChange}
                        fullWidth
                    />
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
                            placeholder="Hidratación, Anti-edad, Luminosidad"
                            fullWidth
                        />
                        <Input
                            label="Tipos de Piel (separados por coma)"
                            name="suitableFor"
                            placeholder="Seca, Mixta, Grasa, Sensible"
                            fullWidth
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Modo de Uso</label>
                                <textarea
                                    name="howToUse"
                                    rows={3}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    placeholder="Aplicar una pequeña cantidad..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mecanismo (Científico)</label>
                                <textarea
                                    name="mechanism"
                                    rows={3}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    placeholder="Actúa mediante la inhibición de..."
                                />
                            </div>
                        </div>

                        <Input
                            label="Momento de Uso"
                            name="whenToUse"
                            placeholder="AM / PM / Todo el día"
                            fullWidth
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen Principal</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary-light/80"
                    />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/admin/productos">
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>Crear Producto</Button>
                </div>
            </form>
        </div>
    );
}
