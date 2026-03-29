import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seed...');

    // Create categories
    console.log('Creating categories...');
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                slug: 'pulseras',
                name: 'Pulseras',
                description: 'Pulseras artesanales con piedras semipreciosas y chapa de oro',
                sortOrder: 1,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'collares',
                name: 'Collares',
                description: 'Collares elegantes elaborados a mano con materiales selectos',
                sortOrder: 2,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'sets',
                name: 'Sets',
                description: 'Conjuntos de joyería artesanal para combinar y regalar',
                sortOrder: 3,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'personalizados',
                name: 'Personalizados',
                description: 'Piezas únicas con iniciales, piedras a elegir y ajustes especiales',
                sortOrder: 4,
            },
        }),
        prisma.category.create({
            data: {
                slug: 'temporada',
                name: 'Temporada',
                description: 'Colecciones especiales por tiempo limitado',
                sortOrder: 5,
            },
        }),
    ]);

    console.log(`Created ${categories.length} categories`);

    // Create materials
    console.log('Creating materials...');
    const materialsData = [
        {
            slug: 'cuarzo-rosa',
            name: 'Cuarzo Rosa',
            description: 'Conocida como la piedra del amor incondicional. Su tono rosado delicado aporta feminidad y calidez.',
            benefits: ['Piedra del amor y la armonía', 'Color rosado natural', 'Energía calmante'],
            type: 'piedra',
            origin: 'Brasil',
        },
        {
            slug: 'amatista',
            name: 'Amatista',
            description: 'Piedra de serenidad y claridad mental. Su color violeta profundo es una de las gemas más apreciadas.',
            benefits: ['Piedra de la serenidad', 'Color violeta intenso', 'Protección energética'],
            type: 'piedra',
            origin: 'Brasil',
        },
        {
            slug: 'perla-de-rio',
            name: 'Perla de Río',
            description: 'Sinónimo de elegancia natural. Cada una es única en forma y brillo.',
            benefits: ['Elegancia natural', 'Brillo iridiscente', 'Cada perla es única'],
            type: 'perla',
            origin: 'China',
        },
        {
            slug: 'chapa-de-oro-18k',
            name: 'Chapa de Oro 18k',
            description: 'Brillo y calidez del oro con mayor accesibilidad. Capa generosa que garantiza durabilidad.',
            benefits: ['Brillo dorado duradero', 'No mancha la piel', 'Hipoalergénico'],
            type: 'metal',
            origin: 'México',
        },
    ];

    const createdMaterials = await Promise.all(
        materialsData.map((m) => prisma.material.create({ data: m }))
    );

    console.log(`Created ${createdMaterials.length} materials`);

    // Create sample products
    console.log('Creating products...');
    const products = await Promise.all([
        prisma.product.create({
            data: {
                slug: 'pulsera-luna-de-cuarzo',
                name: 'Pulsera Luna de Cuarzo',
                tagline: 'Delicadeza en cada detalle',
                description: 'Pulsera artesanal elaborada con cuentas de cuarzo rosa natural y detalles en chapa de oro 18k.',
                price: 650,
                compareAtPrice: 780,
                size: '18cm',
                sku: 'PGN-PUL-001',
                stock: 25,
                isActive: true,
                isFeatured: true,
                isNew: true,
                isBestseller: true,
                benefits: ['Piedras naturales de cuarzo rosa', 'Detalles en chapa de oro 18k', 'Elaborada a mano', 'Ajustable'],
                careInstructions: 'Limpiar con paño suave y seco. Evitar contacto con perfumes, cremas y agua.',
                material: 'Chapa de oro 18k',
                stoneType: 'Cuarzo rosa',
                isCustomizable: false,
                availabilityLabel: 'Disponible',
                collectionType: 'permanente',
                images: [],
                categories: {
                    create: [
                        { category: { connect: { slug: 'pulseras' } } },
                    ],
                },
                materials: {
                    create: [
                        {
                            material: { connect: { slug: 'cuarzo-rosa' } },
                            isPrimary: true,
                        },
                        {
                            material: { connect: { slug: 'chapa-de-oro-18k' } },
                            isPrimary: false,
                        },
                    ],
                },
            },
        }),
        prisma.product.create({
            data: {
                slug: 'collar-gotas-de-perla',
                name: 'Collar Gotas de Perla',
                tagline: 'Sofisticación natural',
                description: 'Collar con perlas de río en forma de gota y cadena en chapa de oro 18k.',
                price: 950,
                compareAtPrice: 1100,
                size: '45cm',
                sku: 'PGN-COL-001',
                stock: 15,
                isActive: true,
                isFeatured: true,
                isNew: true,
                isBestseller: true,
                benefits: ['Perlas de río en forma de gota', 'Cadena en chapa de oro 18k', 'Versátil: casual y formal'],
                careInstructions: 'Las perlas requieren cuidado especial. Limpiar con paño suave después de cada uso. Evitar perfumes y agua.',
                material: 'Chapa de oro 18k',
                stoneType: 'Perla de río',
                isCustomizable: false,
                availabilityLabel: 'Disponible',
                collectionType: 'permanente',
                images: [],
                categories: {
                    create: [
                        { category: { connect: { slug: 'collares' } } },
                    ],
                },
                materials: {
                    create: [
                        {
                            material: { connect: { slug: 'perla-de-rio' } },
                            isPrimary: true,
                        },
                        {
                            material: { connect: { slug: 'chapa-de-oro-18k' } },
                            isPrimary: false,
                        },
                    ],
                },
            },
        }),
    ]);

    console.log(`Created ${products.length} products`);

    // Create a banner
    console.log('Creating banner...');
    await prisma.banner.create({
        data: {
            title: 'Piezas que cuentan\nhistorias',
            subtitle: 'Joyería artesanal elaborada a mano con piedras semipreciosas, perlas y chapa de oro.',
            ctaText: 'Ver Colección',
            ctaLink: '/tienda',
            position: 'hero',
            sortOrder: 1,
            isActive: true,
        },
    });

    console.log('Created banner');
    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
