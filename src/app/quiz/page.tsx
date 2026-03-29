'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

type Step = 'intro' | 'style' | 'occasion' | 'material' | 'result';

interface QuizState {
    style: string | null;
    occasion: string | null;
    material: string | null;
}

const QUESTIONS = {
    style: {
        title: 'Que estilo te describe mejor?',
        options: [
            { id: 'minimalista', label: 'Minimalista', subtitle: 'Piezas delicadas y sutiles' },
            { id: 'bohemio', label: 'Bohemio', subtitle: 'Colores vibrantes y texturas naturales' },
            { id: 'clasico', label: 'Clasico', subtitle: 'Elegancia atemporal' },
            { id: 'atrevido', label: 'Atrevido', subtitle: 'Piezas con presencia y personalidad' },
        ]
    },
    occasion: {
        title: 'Para que ocasion buscas?',
        options: [
            { id: 'diario', label: 'Uso diario', subtitle: 'Para el dia a dia' },
            { id: 'regalo', label: 'Regalo especial', subtitle: 'Para alguien importante' },
            { id: 'fiesta', label: 'Fiesta o evento', subtitle: 'Para brillar en la noche' },
            { id: 'oficina', label: 'Oficina', subtitle: 'Elegancia discreta' },
        ]
    },
    material: {
        title: 'Que materiales prefieres?',
        options: [
            { id: 'piedras', label: 'Piedras naturales', subtitle: 'Cuarzo, amatista, jade' },
            { id: 'perlas', label: 'Perlas', subtitle: 'Brillo clasico y sofisticado' },
            { id: 'chapa-oro', label: 'Chapa de oro', subtitle: 'Tono calido y duradero' },
            { id: 'sorpresa', label: 'Sorprendanme', subtitle: 'Dejanos elegir por ti' },
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
        description: 'Tu estilo refleja sofisticacion sutil. Piezas delicadas que complementan sin sobrecargar.',
    },
    bohemio: {
        bracelet: 'Pulsera Mix Bohemio',
        necklace: 'Collar Cascada de Jade',
        description: 'Tu espiritu libre merece piezas llenas de vida y color. Materiales naturales que expresan tu autenticidad.',
    },
    clasico: {
        bracelet: 'Pulsera Perlas Clasica',
        necklace: 'Collar Gotas de Perla',
        description: 'Tu elegancia no pasa de moda. Piezas atemporales que elevan cualquier look con distincion.',
    },
    atrevido: {
        bracelet: 'Pulsera Doble Vuelta',
        necklace: 'Collar Cadena y Perlas de Oro',
        description: 'No tienes miedo de destacar. Piezas con caracter que reflejan tu personalidad audaz.',
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
            }, 1200);
        }
    };

    const getRecommendation = (): Recommendation => {
        const { style } = answers;
        if (style && RECOMMENDATIONS[style]) return RECOMMENDATIONS[style];
        return RECOMMENDATIONS['minimalista'];
    };

    const resetQuiz = () => {
        setAnswers({ style: null, occasion: null, material: null });
        setCurrentStep('intro');
    };

    const result = getRecommendation();
    const progressWidth = currentStep === 'style' ? '33%' : currentStep === 'occasion' ? '66%' : '100%';

    return (
        <main className="min-h-screen bg-cream flex flex-col items-center justify-center py-20 px-4">

            {/* Progress */}
            {currentStep !== 'intro' && currentStep !== 'result' && (
                <div className="w-full max-w-md h-px bg-gray-200 mb-12">
                    <div className="h-full bg-accent transition-all duration-500" style={{ width: progressWidth }} />
                </div>
            )}

            <div className="w-full max-w-2xl bg-white p-8 md:p-14 min-h-[480px] flex flex-col justify-center">

                {/* INTRO */}
                {currentStep === 'intro' && (
                    <div className="text-center space-y-6">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent block">Quiz de Estilo</span>
                        <h1 className="text-4xl md:text-5xl font-serif">
                            Encuentra tu Estilo
                        </h1>
                        <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                            Responde 3 preguntas y te recomendaremos las piezas perfectas para ti.
                        </p>
                        <Button
                            onClick={() => setCurrentStep('style')}
                            className="h-12 px-10 text-sm tracking-wider uppercase mt-4"
                        >
                            Comenzar
                        </Button>
                    </div>
                )}

                {/* QUESTIONS */}
                {(['style', 'occasion', 'material'] as const).map((stepKey) => {
                    if (currentStep !== stepKey) return null;
                    const question = QUESTIONS[stepKey];

                    return (
                        <div key={stepKey} className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-serif text-center">
                                {question.title}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {question.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(stepKey, option.id)}
                                        className="p-5 border border-gray-100 hover:border-accent hover:bg-cream transition-all text-left group"
                                    >
                                        <span className="font-medium text-primary group-hover:text-accent block mb-1">
                                            {option.label}
                                        </span>
                                        <span className="text-sm text-text-secondary">
                                            {option.subtitle}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* LOADING */}
                {isCalculating && (
                    <div className="text-center space-y-4">
                        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-lg font-serif text-primary">Encontrando tu estilo...</p>
                    </div>
                )}

                {/* RESULT */}
                {currentStep === 'result' && (
                    <div className="text-center space-y-8">
                        <div>
                            <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Tu Resultado</span>
                            <h2 className="text-3xl font-serif">Te recomendamos</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="p-6 bg-cream border border-gray-100">
                                <span className="text-xs uppercase tracking-wider text-accent block mb-1">Pulsera</span>
                                <span className="text-xl font-serif">{result.bracelet}</span>
                            </div>
                            <div className="p-6 bg-cream border border-gray-100">
                                <span className="text-xs uppercase tracking-wider text-accent block mb-1">Collar</span>
                                <span className="text-xl font-serif">{result.necklace}</span>
                            </div>
                        </div>

                        <p className="text-text-secondary leading-relaxed max-w-md mx-auto">
                            {result.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/tienda">
                                <Button className="h-12 px-8 text-sm tracking-wider uppercase">
                                    Ver en Tienda
                                </Button>
                            </Link>
                            <button
                                onClick={resetQuiz}
                                className="text-sm text-text-light hover:text-primary transition-colors py-3"
                            >
                                Volver a empezar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
