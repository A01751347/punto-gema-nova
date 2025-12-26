import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create categories
    console.log('Creating categories...');
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                slug: 'hidratacion',
                name: 'Hidratación',
                description: 'Productos para hidratar y mantener la piel suave',
                sortOrder: 1,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'anti-edad',
                name: 'Anti-Edad',
                description: 'Productos para reducir signos de envejecimiento',
                sortOrder: 2,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'manchas',
                name: 'Manchas',
                description: 'Productos para reducir hiperpigmentación',
                sortOrder: 3,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'acne',
                name: 'Acné',
                description: 'Productos para piel propensa al acné',
                sortOrder: 4,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'barrera',
                name: 'Barrera Cutánea',
                description: 'Productos para fortalecer la barrera de la piel',
                sortOrder: 5,
            },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create ingredients
    console.log('Creating ingredients...');
    const ingredients = await Promise.all([
        prisma.ingredient.create({
            data: {
                slug: 'acido-hialuronico',
                name: 'Ácido Hialurónico',
                description: 'Humectante potente que retiene hasta 1000 veces su peso en agua',
                benefits: [
                    'Hidratación profunda',
                    'Reduce líneas finas',
                    'Mejora elasticidad',
                    'Apto para todo tipo de piel',
                ],
                typicalConcentration: '0.5-2%',
                precautions: 'Usar con hidratante para sellar la humedad',
            },
        }),
        prisma.ingredient.create({
            data: {
                slug: 'vitamina-c',
                name: 'Vitamina C',
                description: 'Antioxidante que estimula colágeno y reduce hiperpigmentación',
                benefits: [
                    'Ilumina la piel',
                    'Reduce manchas',
                    'Estimula colágeno',
                    'Protege contra radicales libres',
                ],
                typicalConcentration: '10-20%',
                precautions: 'Usar protector solar. Puede causar irritación en piel sensible',
            },
        }),
        prisma.ingredient.create({
            data: {
                slug: 'niacinamida',
                name: 'Niacinamida',
                description: 'Vitamina B3 que fortalece la barrera cutánea y regula sebo',
                benefits: [
                    'Reduce poros',
                    'Controla sebo',
                    'Fortalece barrera',
                    'Reduce inflamación',
                ],
                typicalConcentration: '2-10%',
                precautions: 'Generalmente bien tolerado',
            },
        }),
        prisma.ingredient.create({
            data: {
                slug: 'retinol',
                name: 'Retinol',
                description: 'Derivado de vitamina A que acelera renovación celular',
                benefits: [
                    'Reduce arrugas',
                    'Mejora textura',
                    'Estimula colágeno',
                    'Reduce manchas',
                ],
                typicalConcentration: '0.25-1%',
                precautions: 'Usar solo de noche. Puede causar irritación inicial. Usar protector solar',
            },
        }),
    ]);

    console.log(`✅ Created ${ingredients.length} ingredients`);

    // Create products
    console.log('Creating products...');
    const products = await Promise.all([
        prisma.product.create({
            data: {
                slug: 'suero-hidratante-acido-hialuronico',
                name: 'Suero Hidratante con Ácido Hialurónico',
                tagline: 'Hidratación profunda y duradera',
                description: 'Suero ligero con ácido hialurónico de bajo y alto peso molecular para hidratación en múltiples capas de la piel.',
                price: 450,
                compareAtPrice: 550,
                size: '30ml',
                sku: 'YTN-SH-001',
                stock: 50,
                isActive: true,
                isFeatured: true,
                isNew: true,
                isBestseller: false,
                benefits: [
                    'Hidratación profunda de 24 horas',
                    'Reduce apariencia de líneas finas',
                    'Textura ligera de rápida absorción',
                    'Apto para todo tipo de piel',
                ],
                howToUse: 'Aplicar 3-4 gotas sobre piel limpia y húmeda, mañana y noche. Seguir con hidratante.',
                whenToUse: 'AM/PM',
                suitableFor: ['Piel seca', 'Piel normal', 'Piel mixta', 'Piel sensible'],
                notSuitableFor: [],
                mechanism: 'El ácido hialurónico de bajo peso molecular penetra las capas profundas mientras que el de alto peso molecular forma una película hidratante en la superficie.',
                expectedResults: 'Piel más hidratada y suave en 1-2 semanas. Reducción visible de líneas finas en 4-6 semanas con uso continuo.',
                images: [],
                categories: {
                    create: [
                        { category: { connect: { slug: 'hidratacion' } } },
                    ],
                },
                ingredients: {
                    create: [
                        {
                            ingredient: { connect: { slug: 'acido-hialuronico' } },
                            concentration: '2%',
                            isKeyIngredient: true,
                        },
                    ],
                },
            },
        }),
        prisma.product.create({
            data: {
                slug: 'suero-iluminador-vitamina-c',
                name: 'Suero Iluminador con Vitamina C',
                tagline: 'Ilumina y reduce manchas',
                description: 'Suero antioxidante con vitamina C estabilizada que ilumina la piel y reduce hiperpigmentación.',
                price: 520,
                size: '30ml',
                sku: 'YTN-SI-002',
                stock: 35,
                isActive: true,
                isFeatured: true,
                isNew: true,
                isBestseller: false,
                benefits: [
                    'Ilumina el tono de piel',
                    'Reduce manchas oscuras',
                    'Estimula producción de colágeno',
                    'Protege contra daño ambiental',
                ],
                howToUse: 'Aplicar 3-4 gotas sobre piel limpia por la mañana. Seguir con protector solar.',
                whenToUse: 'AM',
                suitableFor: ['Piel opaca', 'Piel con manchas', 'Piel normal', 'Piel mixta'],
                notSuitableFor: ['Piel muy sensible (empezar con concentración baja)'],
                mechanism: 'La vitamina C inhibe la tirosinasa, enzima clave en la producción de melanina, y estimula la síntesis de colágeno.',
                expectedResults: 'Piel más luminosa en 2-3 semanas. Reducción de manchas en 6-8 semanas.',
                images: [],
                categories: {
                    create: [
                        { category: { connect: { slug: 'manchas' } } },
                        { category: { connect: { slug: 'anti-edad' } } },
                    ],
                },
                ingredients: {
                    create: [
                        {
                            ingredient: { connect: { slug: 'vitamina-c' } },
                            concentration: '15%',
                            isKeyIngredient: true,
                        },
                    ],
                },
            },
        }),
        prisma.product.create({
            data: {
                slug: 'suero-equilibrante-niacinamida',
                name: 'Suero Equilibrante con Niacinamida',
                tagline: 'Controla sebo y reduce poros',
                description: 'Suero multifuncional con niacinamida que equilibra la producción de sebo y fortalece la barrera cutánea.',
                price: 480,
                size: '30ml',
                sku: 'YTN-SE-003',
                stock: 42,
                isActive: true,
                isFeatured: true,
                isNew: false,
                isBestseller: true,
                benefits: [
                    'Reduce apariencia de poros',
                    'Controla producción de sebo',
                    'Fortalece barrera cutánea',
                    'Calma rojeces e inflamación',
                ],
                howToUse: 'Aplicar 3-4 gotas sobre piel limpia, mañana y noche.',
                whenToUse: 'AM/PM',
                suitableFor: ['Piel grasa', 'Piel mixta', 'Piel con acné', 'Piel sensible'],
                notSuitableFor: [],
                mechanism: 'La niacinamida regula la producción de sebo, fortalece la barrera lipídica y tiene propiedades antiinflamatorias.',
                expectedResults: 'Reducción de brillo y poros en 2-4 semanas. Mejora de textura en 4-6 semanas.',
                images: [],
                categories: {
                    create: [
                        { category: { connect: { slug: 'barrera' } } },
                        { category: { connect: { slug: 'acne' } } },
                    ],
                },
                ingredients: {
                    create: [
                        {
                            ingredient: { connect: { slug: 'niacinamida' } },
                            concentration: '10%',
                            isKeyIngredient: true,
                        },
                    ],
                },
            },
        }),
        prisma.product.create({
            data: {
                slug: 'suero-renovador-retinol',
                name: 'Suero Renovador con Retinol',
                tagline: 'Renueva y rejuvenece',
                description: 'Suero nocturno con retinol encapsulado que acelera la renovación celular y reduce signos de envejecimiento.',
                price: 580,
                size: '30ml',
                sku: 'YTN-SR-004',
                stock: 28,
                isActive: true,
                isFeatured: true,
                isNew: false,
                isBestseller: true,
                benefits: [
                    'Reduce arrugas y líneas finas',
                    'Mejora textura de la piel',
                    'Estimula producción de colágeno',
                    'Unifica tono de piel',
                ],
                howToUse: 'Aplicar 2-3 gotas sobre piel limpia solo de noche. Empezar 2-3 veces por semana.',
                whenToUse: 'PM',
                suitableFor: ['Piel madura', 'Piel con arrugas', 'Piel normal', 'Piel mixta'],
                notSuitableFor: ['Embarazo', 'Lactancia', 'Piel muy sensible'],
                mechanism: 'El retinol se convierte en ácido retinoico, que acelera la renovación celular y estimula la producción de colágeno.',
                expectedResults: 'Mejora de textura en 4-6 semanas. Reducción de arrugas en 8-12 semanas.',
                images: [],
                categories: {
                    create: [
                        { category: { connect: { slug: 'anti-edad' } } },
                    ],
                },
                ingredients: {
                    create: [
                        {
                            ingredient: { connect: { slug: 'retinol' } },
                            concentration: '0.5%',
                            isKeyIngredient: true,
                        },
                    ],
                },
            },
        }),
    ]);

    console.log(`✅ Created ${products.length} products`);

    // Create a banner
    console.log('Creating banner...');
    await prisma.banner.create({
        data: {
            title: 'Cosmética Natural con Respaldo Científico',
            subtitle: 'Formulaciones basadas en evidencia',
            ctaText: 'Explorar Productos',
            ctaLink: '/tienda',
            position: 'hero',
            sortOrder: 1,
            isActive: true,
        },
    });

    console.log('✅ Created banner');

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
