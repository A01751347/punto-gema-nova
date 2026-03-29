interface CraftsmanshipSectionProps {
    careInstructions?: string | null;
    description?: string | null;
    materials: {
        name: string;
        benefits: string[];
        description: string;
    }[];
}

export default function CraftsmanshipSection({ careInstructions, description, materials }: CraftsmanshipSectionProps) {
    if (!careInstructions && materials.length === 0) return null;

    return (
        <section className="bg-primary text-white py-16 md:py-24 rounded-2xl overflow-hidden my-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

                    {/* About & Care */}
                    <div className="space-y-12">
                        {description && (
                            <div>
                                <h3 className="text-2xl font-serif mb-4 text-white">Sobre esta pieza</h3>
                                <p className="text-white/95 font-light leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}

                        {careInstructions && (
                            <div className="border-l-2 border-white/20 pl-6">
                                <h3 className="text-2xl font-serif mb-4 text-white">Cuidado de tu Pieza</h3>
                                <p className="text-white/95 font-light leading-relaxed">
                                    {careInstructions}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Materials */}
                    {materials.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold tracking-widest uppercase text-white/80 mb-8">
                                Materiales
                            </h3>
                            <div className="space-y-8">
                                {materials.map((mat, idx) => (
                                    <div key={idx} className="group">
                                        <h4 className="text-xl font-medium mb-2 text-white group-hover:text-accent transition-colors">
                                            {mat.name}
                                        </h4>
                                        <p className="text-white/90 text-sm font-light leading-relaxed mb-3">
                                            {mat.description}
                                        </p>
                                        {mat.benefits.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {mat.benefits.map((b, i) => (
                                                    <span key={i} className="text-xs py-1 px-2 border border-white/20 rounded-full text-white/80">
                                                        {b}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
