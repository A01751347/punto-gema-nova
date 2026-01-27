'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, Search, Download, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { validateOrderForInvoicing, createInvoiceRequest } from '@/app/actions/billing';

// Mock catalog for Fiscal Regimes
const REGIMENES = [
    { value: '601', label: '601 - General de Ley Personas Morales' },
    { value: '605', label: '605 - Sueldos y Salarios e Ingresos Asimilados a Salarios' },
    { value: '606', label: '606 - Arrendamiento' },
    { value: '608', label: '608 - Demás ingresos' },
    { value: '612', label: '612 - Personas Físicas con Actividades Empresariales y Profesionales' },
    { value: '626', label: '626 - Régimen Simplificado de Confianza' },
];

const USOS_CFDI = [
    { value: 'G01', label: 'G01 - Adquisición de mercancías' },
    { value: 'G03', label: 'G03 - Gastos en general' },
    { value: 'P01', label: 'P01 - Por definir' },
];

function FacturacionForm() {
    const searchParams = useSearchParams();
    const paramOrderId = searchParams.get('orderId');
    const paramAmount = searchParams.get('amount');

    const [step, setStep] = useState<'search' | 'form' | 'success'>('search');
    const [loading, setLoading] = useState(false);

    // Step 1 State
    const [orderId, setOrderId] = useState(paramOrderId || '');
    const [price, setPrice] = useState(paramAmount || '');
    const [error, setError] = useState<string | null>(null);

    // Step 2 State
    const [fiscalData, setFiscalData] = useState({
        rfc: '',
        razonSocial: '',
        regimenFiscal: '601',
        usoCfdi: 'G03',
        cp: '',
        email: ''
    });

    // Auto-validate if params exist on mount
    useEffect(() => {
        if (paramOrderId && paramAmount) {
            autoValidate(paramOrderId, paramAmount);
        }
    }, []);

    const autoValidate = async (oid: string, amt: string) => {
        setLoading(true);
        try {
            const res = await validateOrderForInvoicing(oid, amt);
            if (res.success) {
                setStep('form');
            } else {
                setError(res.error || 'Error al validar la orden automática');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await validateOrderForInvoicing(orderId, price);
            if (res.success) {
                setStep('form');
            } else {
                setError(res.error || 'Error desconocido');
            }
        } catch (err) {
            setError('Ocurrió un error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await createInvoiceRequest({
                orderNumber: orderId,
                ...fiscalData
            });

            if (res.success) {
                setStep('success');
            } else {
                setError(res.error || 'No se pudo generar la solicitud.');
                window.scrollTo(0, 0);
            }
        } catch (err) {
            setError('Ocurrió un error al enviar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const handleFiscalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFiscalData({ ...fiscalData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto px-4 max-w-2xl py-12">

            {/* Visual Progress Steps */}
            <div className="flex justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10" />
                <div className={`flex flex-col items-center gap-2 bg-white px-2 ${step !== 'search' ? 'text-[#d4af37]' : 'text-[#2c4a52] font-bold'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'search' ? 'bg-[#2c4a52] text-white' : 'bg-green-100 text-green-700'}`}>1</div>
                    <span className="text-xs">Buscar Orden</span>
                </div>
                <div className={`flex flex-col items-center gap-2 bg-white px-2 ${step === 'form' ? 'text-[#2c4a52] font-bold' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'form' ? 'bg-[#2c4a52] text-white' : 'bg-gray-100'}`}>2</div>
                    <span className="text-xs">Datos Fiscales</span>
                </div>
                <div className={`flex flex-col items-center gap-2 bg-white px-2 ${step === 'success' ? 'text-[#2c4a52] font-bold' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'success' ? 'bg-[#2c4a52] text-white' : 'bg-gray-100'}`}>3</div>
                    <span className="text-xs">Descargar</span>
                </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && step !== 'success' && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {/* STEP 1: Search Order */}
            {step === 'search' && (
                <form onSubmit={handleSearchOrder} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-serif text-[#2c4a52] mb-6">Localiza tu compra</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Pedido</label>
                            <input
                                type="text"
                                placeholder="Ej. AG234-567 (revisa tu email)"
                                required
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all uppercase"
                            />
                            <p className="text-xs text-gray-500 mt-2">Lo encuentras en tu correo de confirmación de pedido.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monto Total del Pedido</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    required
                                    min="1"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Ingresa el monto exacto pagado.</p>
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-4 text-base mt-2 flex justify-center items-center gap-2"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            {loading ? 'Validando...' : 'Continuar'}
                        </Button>
                    </div>
                </form>
            )}

            {/* STEP 2: Fiscal Data */}
            {step === 'form' && (
                <form onSubmit={handleGenerateInvoice} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-right-8">
                    <button
                        type="button"
                        onClick={() => setStep('search')}
                        className="text-sm text-gray-400 mb-4 hover:text-[#2c4a52]"
                    >
                        ← Regresar
                    </button>
                    <h2 className="text-2xl font-serif text-[#2c4a52] mb-6">Datos de Facturación</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">RFC</label>
                            <input
                                type="text"
                                name="rfc"
                                placeholder="GEC0001015I5"
                                required
                                value={fiscalData.rfc}
                                onChange={handleFiscalChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none uppercase"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Razón Social</label>
                            <input
                                type="text"
                                name="razonSocial"
                                placeholder="Nombre Completo o Empresa S.A. de C.V."
                                required
                                value={fiscalData.razonSocial}
                                onChange={handleFiscalChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none uppercase"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Régimen Fiscal</label>
                            <select
                                name="regimenFiscal"
                                value={fiscalData.regimenFiscal}
                                onChange={handleFiscalChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none bg-white"
                            >
                                {REGIMENES.map(reg => (
                                    <option key={reg.value} value={reg.value}>{reg.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Uso de CFDI</label>
                            <select
                                name="usoCfdi"
                                value={fiscalData.usoCfdi}
                                onChange={handleFiscalChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none bg-white"
                            >
                                {USOS_CFDI.map(uso => (
                                    <option key={uso.value} value={uso.value}>{uso.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">C.P. Fiscal</label>
                                <input
                                    type="text"
                                    name="cp"
                                    placeholder="11000"
                                    required
                                    value={fiscalData.cp}
                                    onChange={handleFiscalChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="tu@email.com"
                                    required
                                    value={fiscalData.email}
                                    onChange={handleFiscalChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-base mt-4 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            {loading ? 'Enviando Solicitud...' : 'Solicitar Factura'}
                        </Button>
                    </div>
                </form>
            )}

            {/* STEP 3: Success */}
            {step === 'success' && (
                <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-serif text-[#2c4a52] mb-4">¡Solicitud Recibida!</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Hemos guardado tus datos fiscales. En un lapso de <strong>24 a 48 horas hábiles</strong> recibirás tu factura (XML y PDF) al correo: <span className="font-semibold">{fiscalData.email}</span>.
                    </p>

                    <button
                        onClick={() => {
                            setStep('search');
                            setOrderId('');
                            setPrice('');
                            setError(null);
                        }}
                        className="mt-8 text-sm text-gray-500 hover:text-[#d4af37] underline"
                    >
                        Solicitar para otro pedido
                    </button>
                </div>
            )}


            {/* Help Box */}
            <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200/50 flex gap-4 items-start">
                <AlertCircle className="text-gray-400 flex-shrink-0" />
                <div className="text-sm text-gray-500 space-y-2">
                    <p className="font-medium text-gray-700">¿Tienes problemas?</p>
                    <p>
                        Si tu número de orden no aparece o tuviste un error al generar la factura, por favor envíanos tus datos fiscales y el número de compra a <a href="mailto:facturacion@yutnuu.mx" className="text-[#d4af37] underline">facturacion@yutnuu.mx</a> y te ayudaremos manualmente.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default function FacturacionPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#f8f9fa] py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <FileText className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2c4a52] mb-6">Portal de Facturación</h1>
                    <p className="text-lg text-gray-600 font-light">
                        Solicita tu comprobante fiscal (CFDI 4.0) de forma rápida y sencilla.
                        <br />
                        <span className="text-sm text-gray-400 mt-2 block">Tienes hasta el último día del mes en curso para solicitar tu factura.</span>
                    </p>
                </div>
            </div>

            <Suspense fallback={
                <div className="container mx-auto px-4 max-w-2xl py-12 flex justify-center text-gray-500">
                    <Loader2 className="animate-spin" />
                </div>
            }>
                <FacturacionForm />
            </Suspense>
        </main>
    );
}
