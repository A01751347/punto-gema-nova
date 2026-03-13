'use client';

import { useState, useEffect } from 'react';
import { getStoreSettingsAction, updateStoreSettingsAction } from '@/app/actions/admin/settings-actions';
import { Save, Copy, Loader2, Mail, Plus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ConfiguracionAdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTestingEmail, setIsTestingEmail] = useState(false);

    // Setting state
    const [orderEmails, setOrderEmails] = useState<string[]>([]);
    const [invoiceEmails, setInvoiceEmails] = useState<string[]>([]);

    useEffect(() => {
        const fetchSettings = async () => {
            const { success, settings } = await getStoreSettingsAction();
            if (success && settings) {
                setOrderEmails(settings.orderNotificationEmails || []);
                setInvoiceEmails(settings.invoiceNotificationEmails || []);
            }
            setIsLoading(false);
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        // Remove empty strings just in case
        const cleanOrderEmails = orderEmails.map(e => e.trim()).filter(e => e !== '');
        const cleanInvoiceEmails = invoiceEmails.map(e => e.trim()).filter(e => e !== '');

        try {
            const res = await updateStoreSettingsAction({
                orderNotificationEmails: cleanOrderEmails,
                invoiceNotificationEmails: cleanInvoiceEmails
            });

            if (res.success) {
                alert(res.message);
                setOrderEmails(cleanOrderEmails);
                setInvoiceEmails(cleanInvoiceEmails);
            } else {
                alert('Error: ' + res.error);
            }
        } catch (error) {
            console.error(error);
            alert('Error al guardar la configuración');
        } finally {
            setIsSaving(false);
        }
    };

    const handleTestEmail = async () => {
        setIsTestingEmail(true);
        import('@/app/actions/admin/test-email-actions').then(({ sendTestAdminEmailsAction }) => {
            sendTestAdminEmailsAction().then(res => {
                if (res.success) {
                    alert(res.message);
                } else {
                    alert("Error: " + res.error);
                }
            }).catch(e => {
                console.error(e);
                alert("Hubo un error al desencadenar la prueba.");
            });
            setIsTestingEmail(false);
        });
    };


    const addOrderEmail = () => setOrderEmails([...orderEmails, '']);
    const updateOrderEmail = (index: number, val: string) => {
        const newEmails = [...orderEmails];
        newEmails[index] = val;
        setOrderEmails(newEmails);
    };
    const removeOrderEmail = (index: number) => {
        setOrderEmails(orderEmails.filter((_, i) => i !== index));
    };

    const addInvoiceEmail = () => setInvoiceEmails([...invoiceEmails, '']);
    const updateInvoiceEmail = (index: number, val: string) => {
        const newEmails = [...invoiceEmails];
        newEmails[index] = val;
        setInvoiceEmails(newEmails);
    };
    const removeInvoiceEmail = (index: number) => {
        setInvoiceEmails(invoiceEmails.filter((_, i) => i !== index));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-[#2c4a52] w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-[#2c4a52] mb-2">Configuración</h1>
                    <p className="text-gray-500">Administra los parámetros de la tienda y las notificaciones automáticas.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-[#2c4a52] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1f3940] transition-colors disabled:opacity-50"
                >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            {/* Email Notifications Segment */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#2c4a52] flex items-center gap-2">
                        <Mail className="text-[#d4af37]" /> Notificaciones de Equipo
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Configura las direcciones de correo electrónico donde el equipo de soporte o ventas recibirá alertas automáticas.
                        A cada correo enlistado aquí le llegará una copia simultánea.
                    </p>
                </div>

                <div className="p-6 space-y-8">
                    {/* Nuevos Pedidos */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-900">Avisos de Nuevo Pedido</h3>
                            <p className="text-xs text-gray-500 mt-1 mb-4">
                                Recibirán un correo cada que un nuevo pago ser verifique con éxito.
                            </p>
                        </div>

                        {orderEmails.length === 0 && (
                            <div className="text-sm text-gray-400 italic py-2">No hay correos configurados.</div>
                        )}

                        <div className="space-y-3">
                            {orderEmails.map((email, i) => (
                                <div key={i} className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden flex bg-gray-50 items-center px-3 focus-within:ring-2 focus-within:ring-[#2c4a52] focus-within:border-[#2c4a52]">
                                        <Mail size={16} className="text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => updateOrderEmail(i, e.target.value)}
                                            placeholder="ejemplo@yutnuu.com"
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-gray-800"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeOrderEmail(i)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center border border-transparent hover:border-red-200"
                                        title="Eliminar correo"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addOrderEmail}
                            className="text-sm font-semibold flex items-center gap-1 text-[#2c4a52] mt-2 shrink-0 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Plus size={16} /> Añadir otro correo
                        </button>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Solicitudes de Factura */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-900">Solicitudes de Factura</h3>
                            <p className="text-xs text-gray-500 mt-1 mb-4">
                                Recibirán todos los datos fiscales recabados del cliente para generar la factura.
                            </p>
                        </div>

                        {invoiceEmails.length === 0 && (
                            <div className="text-sm text-gray-400 italic py-2">No hay correos configurados.</div>
                        )}

                        <div className="space-y-3">
                            {invoiceEmails.map((email, i) => (
                                <div key={i} className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden flex bg-gray-50 items-center px-3 focus-within:ring-2 focus-within:ring-[#2c4a52] focus-within:border-[#2c4a52]">
                                        <Mail size={16} className="text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => updateInvoiceEmail(i, e.target.value)}
                                            placeholder="contabilidad@yutnuu.com"
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-gray-800"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeInvoiceEmail(i)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center border border-transparent hover:border-red-200"
                                        title="Eliminar correo"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addInvoiceEmail}
                            className="text-sm font-semibold flex items-center gap-1 text-[#2c4a52] mt-2 shrink-0 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Plus size={16} /> Añadir otro correo
                        </button>
                    </div>

                </div>
            </div>

            {/* Test notifications box */}
            <div className="bg-[#2c4a52]/5 rounded-xl border border-[#2c4a52]/20 p-6 flex flex-col sm:flex-row text-center sm:text-left items-center justify-between gap-4">
                <div>
                    <h3 className="font-bold text-[#2c4a52]">¿Quieres probar que todo funciona bien?</h3>
                    <p className="text-sm tracking-wide text-gray-600 mt-1">Antes de probar, asegurate de darle el botón de "Guardar Cambios".</p>
                </div>
                <button
                    onClick={handleTestEmail}
                    disabled={isTestingEmail}
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                >
                    <Mail size={16} />
                    {isTestingEmail ? 'Enviando prueba...' : 'Probar Notificaciones'}
                </button>
            </div>

        </div>
    );
}
