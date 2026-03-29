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

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        stock: '',
        size: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.email) return;

        setIsLoading(true);

        const data = new FormData(e.currentTarget);

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
                        label="Tamaño (ej. 18cm, 45cm)"
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
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles de la Pieza</h3>

                    <div className="space-y-4">
                        <Input
                            label="Beneficios Clave (separados por coma)"
                            name="benefits"
                            placeholder="Piedras naturales, Chapa de oro 18k, Hecho a mano"
                            fullWidth
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Material Principal"
                                name="material"
                                placeholder="Chapa de oro 18k"
                                fullWidth
                            />
                            <Input
                                label="Tipo de Piedra"
                                name="stoneType"
                                placeholder="Cuarzo rosa"
                                fullWidth
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instrucciones de Cuidado</label>
                            <textarea
                                name="careInstructions"
                                rows={3}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                placeholder="Limpiar con paño suave. Evitar contacto con perfumes y agua."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilidad</label>
                                <select
                                    name="availabilityLabel"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="Disponible">Disponible</option>
                                    <option value="Última pieza">Última pieza</option>
                                    <option value="Bajo pedido">Bajo pedido</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Colección</label>
                                <select
                                    name="collectionType"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="permanente">Permanente</option>
                                    <option value="casi-unica">Pieza Casi Única</option>
                                    <option value="personalizado">Personalizado</option>
                                    <option value="temporada">Temporada</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isCustomizable"
                                id="isCustomizable"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="isCustomizable" className="text-sm text-gray-700">
                                Esta pieza es personalizable
                            </label>
                        </div>
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
