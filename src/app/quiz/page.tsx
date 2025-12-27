'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ArrowRight, RefreshCcw, Check, Sparkles } from 'lucide-react';

// --- Types ---
type Step = 'intro' | 'skinType' | 'concern' | 'texture' | 'result';

interface QuizState {
    skinType: string | null;
    concern: string | null;
    texture: string | null;
}

// --- Data ---
const QUESTIONS = {
    skinType: {
        title: "¿Cómo sientes tu piel al despertar?",
        options: [
            { id: 'dry', label: 'Seca y tirante', icon: '🌵' },
            { id: 'oily', label: 'Brillosa / Grasa', icon: '✨' },
            { id: 'combination', label: 'Mixta (Zona T grasa)', icon: '⚖️' },
            { id: 'normal', label: 'Equilibrada y suave', icon: '🌸' },
        ]
    },
    concern: {
        title: "¿Cuál es tu principal preocupación?",
        options: [
            { id: 'aging', label: 'Líneas finas y arrugas', icon: '⏳' },
            { id: 'dryness', label: 'Deshidratación intensa', icon: '💧' },
            { id: 'pigmentation', label: 'Manchas y tono desigual', icon: '☀️' },
            { id: 'acne', label: 'Imperfecciones / Poros', icon: '🔍' },
        ]
    },
    texture: {
        title: "¿Qué texturas prefieres?",
        options: [
            { id: 'oil', label: 'Aceites nutritivos', icon: '🥥' },
            { id: 'cream', label: 'Cremas untuosas', icon: '🧴' },
            { id: 'light', label: 'Geles y sueros ligeros', icon: '🌬️' },
            { id: 'any', label: 'Sin preferencia', icon: '🤷' },
        ]
    }
};

const RECOMMENDATIONS: Record<string, any> = {
    'oil': {
        name: 'Aceite de Tuna Puro',
        image: 'https://yutnu-images.s3.us-east-2.amazonaws.com/products/1766778492644-IMG_7419.jpg', // Placeholder image URL, ensure this is correct or generic
        description: 'Tu piel pide a gritos nuestra joya del desierto. Nutrición profunda y antioxidantes potentes para reparar la barrera cutánea.',
        slug: 'aceite-tuna-roll-on',
    },
    'serum': {
        name: 'Suero Facial YUTNÜÜ',
        image: 'https://yutnu-images.s3.us-east-2.amazonaws.com/products/1766778492644-IMG_7419.jpg', // Placeholder
        description: 'Necesitas una dosis concentrada de activos ligeros. Nuestro suero penetra rápido para tratar líneas finas sin sensación grasa.',
        slug: 'suero-facial',
    },
    'cream': {
        name: 'Crema Facial Hidratante',
        image: 'https://yutnu-images.s3.us-east-2.amazonaws.com/products/1766778492644-IMG_7419.jpg', // Placeholder
        description: 'La base perfecta. Hidratación equilibrada que sella la humedad y suaviza la textura de tu piel instantáneamente.',
        slug: 'crema-facial',
    },
    'kit': {
        name: 'Kit Ritual Completo',
        image: 'https://yutnu-images.s3.us-east-2.amazonaws.com/products/1766778492644-IMG_7419.jpg', // Placeholder
        description: 'Tu piel se beneficiará del "layering" completo. Limpieza, tratamiento y sellado para una transformación total.',
        slug: 'kit-rutina-completa', // Ensure this slug exists or link to shop
    }
};

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState<Step>('intro');
    const [answers, setAnswers] = useState<QuizState>({
        skinType: null,
        concern: null,
        texture: null,
    });
    const [isCalculating, setIsCalculating] = useState(false);

    const handleOptionSelect = (key: keyof QuizState, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));

        // Advance step
        if (key === 'skinType') setCurrentStep('concern');
        if (key === 'concern') setCurrentStep('texture');
        if (key === 'texture') {
            setIsCalculating(true);
            setTimeout(() => {
                setIsCalculating(false);
                setCurrentStep('result');
            }, 1500);
        }
    };

    const getRecommendation = () => {
        const { concern, texture, skinType } = answers;

        // Simple Logic Tree
        if (concern === 'aging' && skinType === 'dry') return RECOMMENDATIONS['oil'];
        if (concern === 'acne' || texture === 'light') return RECOMMENDATIONS['serum'];
        if (skinType === 'oily' && texture !== 'oil') return RECOMMENDATIONS['serum'];
        if (skinType === 'dry' && texture === 'cream') return RECOMMENDATIONS['cream'];

        // Default hero
        return RECOMMENDATIONS['oil'];
    };

    const resetQuiz = () => {
        setAnswers({ skinType: null, concern: null, texture: null });
        setCurrentStep('intro');
    };

    const result = getRecommendation();

    return (
        <main className="min-h-screen bg-cream-light pt-20 pb-20 px-4 flex flex-col items-center justify-center">

            {/* Progress Bar (if started) */}
            {currentStep !== 'intro' && currentStep !== 'result' && (
                <div className="w-full max-w-md h-1 bg-gray-200 rounded-full mb-12 overflow-hidden">
                    <div
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{
                            width: currentStep === 'skinType' ? '33%' :
                                currentStep === 'concern' ? '66%' : '100%'
                        }}
                    />
                </div>
            )}

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col justify-center text-center transition-all duration-500">

                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* --- INTRO --- */}
                {currentStep === 'intro' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="inline-block p-4 rounded-full bg-accent/10 text-accent mb-4">
                            <Sparkles size={32} />
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-primary">
                            Descubre tu Ritual Ideal
                        </h1>
                        <p className="text-xl text-text-secondary font-light">
                            Responde 3 preguntas sencillas y nuestros expertos diseñarán la rutina perfecta para las necesidades únicas de tu piel.
                        </p>
                        <Button
                            onClick={() => setCurrentStep('skinType')}
                            className="px-12 py-4 h-auto text-lg w-full md:w-auto mt-8"
                        >
                            Comenzar Diagnóstico
                        </Button>
                    </div>
                )}

                {/* --- STEPS --- */}
                {(['skinType', 'concern', 'texture'] as const).map((stepKey) => {
                    if (currentStep !== stepKey) return null;
                    const question = QUESTIONS[stepKey];

                    return (
                        <div key={stepKey} className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-3xl font-serif text-primary mb-8">
                                {question.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {question.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(stepKey, option.id)}
                                        className="p-6 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-accent/5 transition-all text-left group flex items-center gap-4"
                                    >
                                        <span className="text-4xl group-hover:scale-110 transition-transform block">
                                            {option.icon}
                                        </span>
                                        <span className="font-medium text-lg text-primary group-hover:text-accent">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* --- LOADING --- */}
                {isCalculating && (
                    <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6">
                        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                        <p className="text-xl font-serif text-primary animate-pulse">
                            Analizando tu perfil...
                        </p>
                    </div>
                )}

                {/* --- RESULT --- */}
                {currentStep === 'result' && (
                    <div className="text-center animate-in zoom-in-95 duration-700">
                        <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">
                            Tu Aliado Perfecto
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                            {result.name}
                        </h2>

                        <div className="relative w-full aspect-square max-w-xs mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src={result.image}
                                alt={result.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <p className="text-text-secondary text-lg font-light mb-10 max-w-lg mx-auto leading-relaxed">
                            {result.description}
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href={`/tienda`}>
                                <Button className="w-full md:w-auto px-8 py-3 shadow-lg">
                                    Ver en Tienda <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                            <button
                                onClick={resetQuiz}
                                className="flex items-center justify-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm py-3"
                            >
                                <RefreshCcw size={16} /> Volver a empezar
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
