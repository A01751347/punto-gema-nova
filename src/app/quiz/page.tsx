'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, RefreshCcw, Sparkles, Gem, Crown, Flame, Calendar, Gift, PartyPopper, Briefcase, Diamond, Shell, CircleDot, HelpCircle } from 'lucide-react';

// --- Types ---
type Step = 'intro' | 'style' | 'occasion' | 'material' | 'result';

interface QuizState {
    style: string | null;
    occasion: string | null;
    material: string | null;
}

// --- Data ---
const QUESTIONS = {
    style: {
        title: '¿Qué estilo te describe mejor?',
        options: [
            { id: 'minimalista', label: 'Minimalista', subtitle: 'Piezas delicadas y sutiles', icon: <Sparkles size={32} /> },
            { id: 'bohemio', label: 'Bohemio', subtitle: 'Colores vibrantes y texturas naturales', icon: <Gem size={32} /> },
            { id: 'clasico', label: 'Clásico', subtitle: 'Elegancia atemporal', icon: <Crown size={32} /> },
            { id: 'atrevido', label: 'Atrevido', subtitle: 'Piezas con presencia y personalidad', icon: <Flame size={32} /> },
        ]
    },
    occasion: {
        title: '¿Para qué ocasión buscas?',
        options: [
            { id: 'diario', label: 'Uso diario', subtitle: 'Para el día a día', icon: <Calendar size={32} /> },
            { id: 'regalo', label: 'Regalo especial', subtitle: 'Para alguien importante', icon: <Gift size={32} /> },
            { id: 'fiesta', label: 'Fiesta o evento', subtitle: 'Para brillar en la noche', icon: <PartyPopper size={32} /> },
            { id: 'oficina', label: 'Oficina / profesional', subtitle: 'Elegancia discreta', icon: <Briefcase size={32} /> },
        ]
    },
    material: {
        title: '¿Qué materiales prefieres?',
        options: [
            { id: 'piedras', label: 'Piedras naturales', subtitle: 'Cuarzo, amatista, jade', icon: <Diamond size={32} /> },
            { id: 'perlas', label: 'Perlas', subtitle: 'Brillo clásico y sofisticado', icon: <Shell size={32} /> },
            { id: 'chapa-oro', label: 'Chapa de oro', subtitle: 'Tono cálido y duradero', icon: <CircleDot size={32} /> },
            { id: 'sorpresa', label: 'Sin preferencia, sorpréndanme', subtitle: 'Déjanos elegir por ti', icon: <HelpCircle size={32} /> },
        ]
    }
};

interface Recommendation {
    bracelet: string;
    necklace: string;
    description: string;
}

const RECOMMENDATIONS: Record<string, Recommendation> = {
    minimalista: {
        bracelet: 'Pulsera Minimalista Oro',
        necklace: 'Collar Amatista Solitario',
        description: 'Tu estilo refleja sofisticación sutil. Piezas delicadas que complementan sin sobrecargar, perfectas para quienes aprecian la belleza en lo simple.',
    },
    bohemio: {
        bracelet: 'Pulsera Mix Bohemio',
        necklace: 'Collar Cascada de Jade',
        description: 'Tu espíritu libre merece piezas llenas de vida y color. Materiales naturales que conectan con la tierra y expresan tu autenticidad.',
    },
    clasico: {
        bracelet: 'Pulsera Perlas Clásica',
        necklace: 'Collar Gotas de Perla',
        description: 'Tu elegancia no pasa de moda. Piezas atemporales que elevan cualquier look con gracia y distinción, como una herencia que perdura.',
    },
    atrevido: {
        bracelet: 'Pulsera Doble Vuelta',
        necklace: 'Collar Cadena y Perlas de Oro',
        description: 'No tienes miedo de destacar. Piezas con carácter que hacen una declaración y reflejan tu personalidad audaz y única.',
    },
};

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState<Step>('intro');
    const [answers, setAnswers] = useState<QuizState>({
        style: null,
        occasion: null,
        material: null,
    });
    const [isCalculating, setIsCalculating] = useState(false);

    const handleOptionSelect = (key: keyof QuizState, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));

        if (key === 'style') setCurrentStep('occasion');
        if (key === 'occasion') setCurrentStep('material');
        if (key === 'material') {
            setIsCalculating(true);
            setTimeout(() => {
                setIsCalculating(false);
                setCurrentStep('result');
            }, 1500);
        }
    };

    const getRecommendation = (): Recommendation => {
        const { style } = answers;
        if (style && RECOMMENDATIONS[style]) {
            return RECOMMENDATIONS[style];
        }
        return RECOMMENDATIONS['minimalista'];
    };

    const resetQuiz = () => {
        setAnswers({ style: null, occasion: null, material: null });
        setCurrentStep('intro');
    };

    const result = getRecommendation();

    return (
        <main className="min-h-screen bg-cream-light pt-20 pb-20 px-4 flex flex-col items-center justify-center">

            {/* Progress Bar */}
            {currentStep !== 'intro' && currentStep !== 'result' && (
                <div className="w-full max-w-md h-1 bg-gray-200 rounded-full mb-12 overflow-hidden">
                    <div
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{
                            width: currentStep === 'style' ? '33%' :
                                currentStep === 'occasion' ? '66%' : '100%'
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
                            <Gem size={32} />
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-primary">
                            Encuentra tu Estilo
                        </h1>
                        <p className="text-xl text-text-secondary font-light">
                            Responde 3 preguntas sencillas y te recomendaremos las piezas de joyería artesanal perfectas para ti.
                        </p>
                        <Button
                            onClick={() => setCurrentStep('style')}
                            className="px-12 py-4 h-auto text-lg w-full md:w-auto mt-8"
                        >
                            Comenzar Quiz
                        </Button>
                    </div>
                )}

                {/* --- STEPS --- */}
                {(['style', 'occasion', 'material'] as const).map((stepKey) => {
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
                                        <div>
                                            <span className="font-medium text-lg text-primary group-hover:text-accent block">
                                                {option.label}
                                            </span>
                                            <span className="text-sm text-text-secondary">
                                                {option.subtitle}
                                            </span>
                                        </div>
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
                            Encontrando tu estilo perfecto...
                        </p>
                    </div>
                )}

                {/* --- RESULT --- */}
                {currentStep === 'result' && (
                    <div className="text-center animate-in zoom-in-95 duration-700">
                        <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">
                            Tu Estilo Perfecto
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                            Te recomendamos
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                                <p className="text-sm uppercase tracking-wider text-accent mb-1">Pulsera</p>
                                <p className="text-xl font-serif text-primary">{result.bracelet}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                                <p className="text-sm uppercase tracking-wider text-accent mb-1">Collar</p>
                                <p className="text-xl font-serif text-primary">{result.necklace}</p>
                            </div>
                        </div>

                        <p className="text-text-secondary text-lg font-light mb-10 max-w-lg mx-auto leading-relaxed">
                            {result.description}
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href="/tienda">
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
