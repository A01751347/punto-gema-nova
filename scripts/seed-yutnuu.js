const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
    {
        name: "Crema Facial YUTNÜU Cosmetics",
        slug: "crema-facial-yutnuu",
        sku: "CF-001",
        price: 850.00,
        tagline: "Hidratación profunda y regeneración",
        description: "Hidratación profunda y regeneración diaria para tu piel. La Crema Facial YUTNÜU está formulada para brindar una hidratación intensa, mejorar la textura de la piel y apoyar el proceso natural de regeneración cutánea.",
        howToUse: "Aplicar sobre el rostro limpio y seco con movimientos circulares hasta su completa absorción. Puede usarse por la mañana y por la noche.",
        whenToUse: "AM/PM",
        suitableFor: ["Todo tipo de piel", "Piel seca", "Piel mixta"],
        benefits: ["Hidrata y humecta profundamente", "Unifica el tono", "Favorece regeneración", "Mejora suavidad y elasticidad"],
        mechanism: "Su combinación de ingredientes de origen vegetal actúa como humectante, despigmentante y regenerante.",
        expectedResults: "Piel más suave, luminosa y con un tono más uniforme desde las primeras aplicaciones.",
        ingredientsList: ["Agua", "Aceite de girasol", "Isopropyl palmitate", "Glicerina", "Niacinamida", "Alcohol ceteárico", "Aceite de semilla de tuna", "Vitamina E", "Pantenol", "Fragancia"],
        size: "50ml",
        images: ["/images/placeholder-crema.jpg"]
    },
    {
        name: "Aceite Capilar YUTNÜU Cosmetics",
        slug: "aceite-capilar-yutnuu",
        sku: "AC-001",
        price: 650.00,
        tagline: "Nutrición y brillo sin sensación grasa",
        description: "Hidratación, nutrición y fortalecimiento para tu cabello. Diseñado para nutrir profundamente el cabello seco o maltratado, aportando brillo, suavidad y protección sin dejar sensación pesada.",
        howToUse: "Atomizar sobre el cabello seco, de medios a puntas, y distribuir con las manos.",
        whenToUse: "AM/PM",
        suitableFor: ["Cabello seco", "Cabello maltratado", "Cabello con frizz"],
        benefits: ["Hidrata y nutre", "Aporta brillo y suavidad", "Fortalece fibra capilar", "Controla frizz"],
        mechanism: "Combina siliconas cosméticas con aceites naturales (argán, lino, tuna) que sellan la humedad.",
        expectedResults: "Cabello manejable, brillante y protegido al instante.",
        ingredientsList: ["Cyclomethicone", "Dimethicone", "Aceite de argán", "Aceite de semilla de tuna", "Aceite de linaza", "Fragancia", "Vitamina E"],
        size: "50ml",
        images: ["/images/placeholder-aceite-capilar.jpg"]
    },
    {
        name: "Suero Facial YUTNÜU Cosmetics",
        slug: "suero-facial-yutnuu",
        sku: "SF-001",
        price: 950.00,
        tagline: "Tratamiento antioxidante intensivo",
        description: "Tratamiento antioxidante para una piel más joven y luminosa. Es un tratamiento ligero de uso diario que ayuda a disminuir visiblemente las líneas de expresión mientras hidrata y regenera la piel.",
        howToUse: "Aplicar sobre el rostro limpio y seco con movimientos circulares hasta que se absorba por completo.",
        whenToUse: "AM/PM",
        suitableFor: ["Piel madura", "Líneas de expresión", "Falta de luminosidad"],
        benefits: ["Disminuye líneas de expresión", "Acción antioxidante", "Hidratante y regenerante", "Rápida absorción"],
        mechanism: "Protege contra el daño ambiental y contribuye a una apariencia fresca y revitalizada gracias a sus antioxidantes.",
        expectedResults: "Piel revitalizada, líneas suavizadas y mayor luminosidad.",
        ingredientsList: ["Agua", "Aceite de semilla de tuna", "Glicerina", "Butylene glycol", "EDTA", "Fragancia"], // Simplified from user list
        size: "30ml",
        images: ["/images/placeholder-suero.jpg"]
    },
    {
        name: "Aceite de Tuna YUTNÜU Cosmetics",
        slug: "aceite-tuna-puro",
        sku: "AT-001",
        price: 1200.00,
        tagline: "Oro Líquido 100% Puro",
        description: "Antioxidante natural para el cuidado intensivo de la piel. Un concentrado natural con alto poder antioxidante, ideal para hidratar profundamente la piel y apoyar la regeneración celular.",
        howToUse: "Aplicar sobre el rostro limpio y seco con suaves movimientos circulares hasta su absorción.",
        whenToUse: "PM",
        suitableFor: ["Piel seca", "Piel madura", "Piel sensible"],
        benefits: ["Antioxidante natural potente", "Combate líneas de expresión", "Humectante y regenerante", "Nutrición intensiva"],
        mechanism: "Alto contenido de vitamina E y ácidos grasos esenciales que reparan la barrera cutánea.",
        expectedResults: "Piel profundamente nutrida y regenerada.",
        ingredientsList: ["Aceite de semilla de tuna (Opuntia ficus-indica)"],
        size: "10ml",
        images: ["/images/placeholder-aceite-tuna.jpg"]
    }
];

async function main() {
    console.log('Starting seed process...');
    console.log('Connecting to database...');

    try {
        console.log('Deleting OrderItems...');
        const deletedOrderItems = await prisma.orderItem.deleteMany({});
        console.log(`Deleted ${deletedOrderItems.count} order items.`);

        console.log('Deleting ProductIngredients...');
        const deletedPI = await prisma.productIngredient.deleteMany({});
        console.log(`Deleted ${deletedPI.count} product ingredients.`);

        console.log('Deleting Products...');
        const deletedProducts = await prisma.product.deleteMany({});
        console.log(`Deleted ${deletedProducts.count} products.`);
    } catch (e) {
        console.error('Error during cleanup:', e);
        throw e;
    }

    // Note: We might want to keep generic ingredients if they are shared, but user asked to remove "products in bd". 
    // I will try to reuse ingredients or create them.

    for (const p of products) {
        console.log(`Creating product: ${p.name}`);

        const product = await prisma.product.create({
            data: {
                name: p.name,
                slug: p.slug,
                sku: p.sku,
                description: p.description,
                price: p.price,
                tagline: p.tagline,
                size: p.size,
                howToUse: p.howToUse,
                whenToUse: p.whenToUse,
                benefits: p.benefits,
                suitableFor: p.suitableFor,
                mechanism: p.mechanism,
                expectedResults: p.expectedResults,
                images: p.images,
                isActive: true,
                stock: 100
            }
        });

        // Handle Ingredients
        for (const ingName of p.ingredientsList) {
            // Upsert ingredient
            // Basic slugification
            const ingSlug = ingName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const ingredient = await prisma.ingredient.upsert({
                where: { slug: ingSlug },
                update: {},
                create: {
                    name: ingName,
                    slug: ingSlug,
                    description: `Ingrediente ${ingName}`, // Placeholder description
                }
            });

            // Link
            await prisma.productIngredient.create({
                data: {
                    productId: product.id,
                    ingredientId: ingredient.id,
                    isKeyIngredient: ["Aceite de semilla de tuna", "Niacinamida", "Vitamina E", "Aceite de argán"].some(k => ingName.includes(k))
                }
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
