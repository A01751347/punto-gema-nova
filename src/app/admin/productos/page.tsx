'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminProductsAction, deleteProductAction } from '@/app/actions/admin/product-actions';
import Link from 'next/link';

export default function AdminProductsPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadProducts = async () => {
        if (user?.email) {
            const { success, products } = await getAdminProductsAction(user.email);
            if (success && products) setProducts(products);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        if (user?.email) {
            const { success } = await deleteProductAction(user.email, id);
            if (success) loadProducts();
            else alert('Failed to delete');
        }
    };

    if (isLoading) return <div className="p-8 text-gray-400">Cargando productos...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-gray-800">Productos</h1>
                <Link
                    href="/admin/productos/nuevo"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    + Nuevo Producto
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="px-6 py-4">Imagen</th>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Precio</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                                            {product.images[0] ? (
                                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{product.sku}</td>
                                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={product.stock <= 10 ? 'text-red-500 font-bold' : ''}>{product.stock}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {product.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">
                                            <Link href={`/admin/productos/editar/${product.id}`} className="text-primary hover:underline">
                                                Editar
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No hay productos. Agrega uno nuevo.</div>
                )}
            </div>
        </div>
    );
}
