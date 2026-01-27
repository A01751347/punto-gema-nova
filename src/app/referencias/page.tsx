import type { Metadata } from 'next';
import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Referencias Científicas | Yutnüu',
    description: 'Bibliografía y estudios que respaldan nuestras formulaciones.',
};

const REFERENCES = [
    {
        title: "Cactus (Opuntia ficus-indica): A review on its chemical composition and various biological effects",
        authors: "El-Mostafa, K., et al.",
        journal: "Biomedicine & Pharmacotherapy",
        year: "2014",
        summary: "Estudio exhaustivo que detalla la composición química del nopal y sus propiedades antioxidantes, antiinflamatorias y neuroprotectoras.",
        link: "https://pubmed.ncbi.nlm.nih.gov/24948196/"
    },
    {
        title: "Skin wound healing potential of Opuntia ficus-indica.",
        authors: "Trombetta, D., et al.",
        journal: "Frontiers in Bioscience",
        year: "2006",
        summary: "Se demostró que los polisacáridos extraídos de los cladodios del nopal aceleran significativamente el proceso de cicatrización y regeneración dérmica.",
        link: "https://pubmed.ncbi.nlm.nih.gov/16368493/"
    },
    {
        title: "Vitamin E in dermatology",
        authors: "Keen, M. A., & Hassan, I.",
        journal: "Indian Dermatology Online Journal",
        year: "2016",
        summary: "Revisión clínica sobre el uso tópico de la Vitamina E (Tocoferol), destacando su papel crucial como fotoprotector y estabilizador de la barrera cutánea.",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4976416/"
    },
    {
        title: "Moisturizers: The Slippery Road",
        authors: "Sethi, A., et al.",
        journal: "Indian Journal of Dermatology",
        year: "2016",
        summary: "Análisis de los mecanismos de hidratación de la piel y cómo los lípidos botánicos (oclusivos y emolientes) intervienen en la reparación de la barrera.",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4885180/"
    }
];

export default function ReferencesPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <div className="bg-[#2c4a52] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                    <GraduationCap className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif mb-6 text-[#d4af37]">Referencias Científicas</h1>
                    <p className="text-lg text-white/80 font-light">
                        No vendemos milagros, vendemos ciencia. Nuestra biblioteca de evidencia respalda cada afirmación que hacemos.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-16">
                <div className="grid gap-6">
                    {REFERENCES.map((ref, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-serif text-[#2c4a52] leading-tight">
                                        {ref.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-mono">
                                        {ref.journal} • {ref.year}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {ref.authors}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            <span className="font-bold text-[#2c4a52]">Resumen:</span> {ref.summary}
                                        </p>
                                    </div>
                                </div>
                                {ref.link && (
                                    <a
                                        href={ref.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-[#d4af37] transition-colors p-2"
                                        title="Leer Publicación"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400 italic">
                        *Nota: Esta lista se actualiza constantemente conforme surgen nuevas investigaciones relevantes para nuestros ingredientes.
                    </p>
                </div>
            </div>
        </main>
    );
}
