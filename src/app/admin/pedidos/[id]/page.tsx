'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { getAdminOrderDetailsAction } from '@/app/actions/admin/admin-order-details';
import { updateOrderStatusAction } from '@/app/actions/admin/admin-actions';
import Link from 'next/link';
import {
    ChevronLeft,
    Package,
    User,
    CreditCard,
    Truck,
    Calendar,
    MapPin,
    Printer,
    Mail,
    Phone
} from 'lucide-react';
import Image from 'next/image';

// New imports
import { updateOrderTrackingAction } from '@/app/actions/admin/admin-tracking';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const { user } = useAuth();
    const router = useRouter();

    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Tracking Modal State
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');

    const loadOrder = async () => {
        if (user?.email && params.id) {
            const { success, order: fetchedOrder, error } = await getAdminOrderDetailsAction(user.email, params.id as string);
            if (success && fetchedOrder) {
                setOrder(fetchedOrder);
                setTrackingNumber(fetchedOrder.trackingNumber || '');
                setShippingMethod(fetchedOrder.shippingMethod || 'Estándar');
            } else {
                setError(error || 'Failed to load order');
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadOrder();
    }, [user, params.id]);

    const handleStatusChange = async (newStatus: string) => {
        if (!user?.email || !order) return;
        setIsUpdating(true);
        const { success } = await updateOrderStatusAction(user.email, order.id, newStatus);
        if (success) {
            setOrder({ ...order, status: newStatus });
        } else {
            alert('Error updating status');
        }
        setIsUpdating(false);
    };

    const handleTrackingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.email || !order) return;

        setIsUpdating(true);
        const { success, order: updatedOrder } = await updateOrderTrackingAction(user.email, order.id, trackingNumber, shippingMethod);

        if (success && updatedOrder) {
            setOrder(updatedOrder);
            setIsTrackingModalOpen(false);
        } else {
            alert('Error updating tracking info');
        }
        setIsUpdating(false);
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    if (error || !order) return (
        <div className="p-8 text-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
                Error: {error}
            </div>
            <div className="mt-4">
                <Link href="/admin/pedidos" className="text-primary hover:underline">Volver a pedidos</Link>
            </div>
        </div>
    );

    const date = new Date(order.createdAt).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
            case 'SHIPPED': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'PROCESSING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/pedidos"
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm hover:text-primary transition-all"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-serif text-[#000000] flex items-center gap-3">
                            Pedido #{order.orderNumber}
                            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-sans font-bold tracking-wide ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar size={14} />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={isUpdating}
                        className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary shadow-sm outline-none"
                    >
                        <option value="PENDING">Pendiente</option>
                        <option value="CONFIRMED">Confirmado</option>
                        <option value="PROCESSING">Procesando</option>
                        <option value="SHIPPED">Enviado</option>
                        <option value="DELIVERED">Entregado</option>
                        <option value="CANCELLED">Cancelado</option>
                    </select>

                    <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm">
                        <Printer size={16} /> Imprimir
                    </button>
                    <button className="bg-[#000000] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#000000]/90 shadow-lg shadow-primary/20">
                        Enviar Notificación
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Items & Payment */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Items Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Package size={18} className="text-gray-400" />
                                Artículos ({order.items.length})
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-6 flex gap-6 hover:bg-gray-50/50 transition-colors">
                                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 relative">
                                        {item.product.images[0] ? (
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Sin img</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 text-lg mb-1">{item.name}</h4>
                                        <p className="text-gray-500 text-sm">SKU: {item.sku || 'N/A'}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-gray-900 text-lg">
                                            ${(item.price * item.quantity).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {item.quantity} x ${item.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Financial Summary Footer */}
                        <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <div className="flex flex-col gap-2 max-w-xs ml-auto">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Envío</span>
                                    <span>${order.shippingCost.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Impuestos</span>
                                    <span>${order.tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="h-px bg-gray-200 my-2" />
                                <div className="flex justify-between text-[#000000] font-serif text-xl font-bold">
                                    <span>Total</span>
                                    <span>${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-6">
                            <CreditCard size={18} className="text-gray-400" />
                            Pago
                        </h3>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center shadow-sm px-1">
                                <span className="text-[10px] font-bold text-gray-600 truncate uppercase">
                                    {order.paymentMethod === 'mercadopago' ? 'MP' : order.paymentMethod?.substring(0, 4) || 'CARD'}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-gray-900 uppercase truncate">
                                    {order.paymentMethod || 'Método no especificado'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {order.paymentStatus === 'COMPLETED'
                                        ? `Pagado el ${new Date(order.updatedAt || order.createdAt).toLocaleDateString()}`
                                        : 'Pago pendiente'}
                                </p>
                                {order.paymentId && (
                                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono truncate">ID: {order.paymentId}</p>
                                )}
                            </div>
                            <div className="ml-auto flex-shrink-0">
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${order.paymentStatus === 'COMPLETED' ? 'bg-green-50 text-green-700 border border-green-100' :
                                    order.paymentStatus === 'FAILED' ? 'bg-red-50 text-red-700 border border-red-100' :
                                        'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                    }`}>
                                    {order.paymentStatus === 'COMPLETED' ? 'Pagado' :
                                        order.paymentStatus === 'FAILED' ? 'Fallido' : 'Pendiente'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Customer & Shipping */}
                <div className="space-y-8">

                    {/* Customer Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-6">
                            <User size={18} className="text-gray-400" />
                            Cliente
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold text-lg">
                                {order.user?.firstName?.[0] || order.shippingAddress?.firstName?.[0] || 'C'}
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">
                                    {order.user?.firstName ? `${order.user.firstName} ${order.user.lastName}` : `${order.shippingAddress?.firstName} ${order.shippingAddress?.lastName}`}
                                </h4>
                                <p className="text-xs text-gray-500">Cliente Recurrente</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors cursor-pointer">
                                <Mail size={16} />
                                <span className="truncate">{order.user?.email || order.guestEmail}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone size={16} />
                                <span>{order.shippingAddress?.phone || 'Sin teléfono'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
                        <button
                            onClick={() => setIsTrackingModalOpen(true)}
                            className="absolute top-6 right-6 text-xs font-medium text-primary hover:underline flex items-center gap-1"
                        >
                            Editar
                        </button>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-6">
                            <Truck size={18} className="text-gray-400" />
                            Envío
                        </h3>

                        {order.shippingAddress ? (
                            <div className="relative pl-6 border-l-2 border-gray-100 space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Dirección</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {order.shippingAddress.address1} {order.shippingAddress.address2}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                                        CP {order.shippingAddress.postalCode}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Guía de Rastreo</span>
                                    {order.trackingNumber ? (
                                        <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-blue-100">
                                            <span className="font-mono text-sm text-blue-900 font-medium">{order.trackingNumber}</span>
                                            <a href={`https://www.google.com/search?q=${order.trackingNumber}`} target="_blank" className="text-xs text-blue-500 hover:underline">Rastrear</a>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No asignada</p>
                                    )}
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Método</span>
                                    <p className="text-sm text-gray-700 font-medium capitalize">{order.shippingMethod || 'Estándar'}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
                                Sin información de envío
                            </div>
                        )}

                        {/* Interactive prompt if no tracking */}
                        {!order.trackingNumber && (
                            <div className="mt-4 pt-4 border-t border-gray-50">
                                <Button variant="outline" className="w-full text-xs" onClick={() => setIsTrackingModalOpen(true)}>
                                    + Asignar Guía
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Notes Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            Notas
                        </h3>
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800 italic">
                            "{order.customerNotes || "Sin notas del cliente."}"
                        </div>
                    </div>

                </div>
            </div>

            {/* Tracking Modal */}
            <Modal
                isOpen={isTrackingModalOpen}
                onClose={() => setIsTrackingModalOpen(false)}
                title="Información de Envío"
            >
                <form onSubmit={handleTrackingSubmit} className="space-y-4">
                    <p className="text-sm text-gray-500">Agrega o actualiza el número de guía para que el cliente pueda rastrear su paquete.</p>

                    <Input
                        label="Número de Guía (Tracking ID)"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Ej. FEDEX-12345678"
                    />

                    <Input
                        label="Paquetería / Método"
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        placeholder="Ej. FedEx Express, DHL, Estafeta"
                    />

                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsTrackingModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" isLoading={isUpdating}>Guardar Cambios</Button>
                    </div>
                </form>
            </Modal>

        </div>
    );
}
