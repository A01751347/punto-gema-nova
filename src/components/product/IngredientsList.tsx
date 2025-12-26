interface IngredientsListProps {
    ingredients: { name: string }[];
}

export default function IngredientsList({ ingredients }: IngredientsListProps) {
    if (!ingredients || ingredients.length === 0) return null;

    return (
        <div className="border-t border-gray-200 py-12">
            <h3 className="text-lg font-medium text-text-primary mb-6">
                Lista Completa de Ingredientes
            </h3>
            <p className="text-sm text-text-secondary font-light leading-loose uppercase">
                {ingredients.map(i => i.name).join(", ")}.
            </p>
        </div>
    );
}
