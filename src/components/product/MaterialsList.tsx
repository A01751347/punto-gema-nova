interface MaterialsListProps {
    materials: { name: string; type?: string }[];
}

export default function MaterialsList({ materials }: MaterialsListProps) {
    if (!materials || materials.length === 0) return null;

    return (
        <div className="border-t border-gray-200 py-12">
            <h3 className="text-lg font-medium text-text-primary mb-6">
                Materiales y Componentes
            </h3>
            <div className="flex flex-wrap gap-3">
                {materials.map((m, idx) => (
                    <span
                        key={idx}
                        className="text-sm px-4 py-2 bg-cream-light rounded-full text-text-secondary font-light"
                    >
                        {m.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
