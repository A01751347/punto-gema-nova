const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting Punto Gema Nova seed...');

    // Clean up
    console.log('Cleaning up...');
    await prisma.bundleProduct.deleteMany({});
    await prisma.productMaterial.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.bundle.deleteMany({});
    await prisma.material.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.banner.deleteMany({});

    // === CATEGORIES ===
    console.log('Creating categories...');
    const categories = {};
    for (const cat of [
        { slug: 'pulseras', name: 'Pulseras', description: 'Pulseras artesanales con piedras semipreciosas y chapa de oro', sortOrder: 1 },
        { slug: 'collares', name: 'Collares', description: 'Collares elegantes elaborados a mano con materiales selectos', sortOrder: 2 },
        { slug: 'sets', name: 'Sets', description: 'Conjuntos de joyería artesanal para combinar y regalar', sortOrder: 3 },
        { slug: 'personalizados', name: 'Personalizados', description: 'Piezas únicas con iniciales, piedras a elegir y ajustes especiales', sortOrder: 4 },
        { slug: 'temporada', name: 'Temporada', description: 'Colecciones especiales por tiempo limitado', sortOrder: 5 },
    ]) {
        categories[cat.slug] = await prisma.category.create({ data: cat });
    }
    console.log(`Created ${Object.keys(categories).length} categories`);

    // === MATERIALS ===
    console.log('Creating materials...');
    const materials = {};
    for (const mat of [
        { slug: 'cuarzo-rosa', name: 'Cuarzo Rosa', description: 'Conocida como la piedra del amor incondicional, el cuarzo rosa emana una energía suave y reconfortante. Su tono rosado delicado aporta feminidad y calidez a cada pieza.', benefits: ['Piedra del amor y la armonía', 'Color rosado natural', 'Energía calmante'], type: 'piedra', origin: 'Brasil' },
        { slug: 'amatista', name: 'Amatista', description: 'La amatista es una piedra de serenidad y claridad mental. Su color violeta profundo la convierte en una de las gemas más apreciadas en joyería artesanal.', benefits: ['Piedra de la serenidad', 'Color violeta intenso', 'Protección energética'], type: 'piedra', origin: 'Brasil' },
        { slug: 'perla-de-rio', name: 'Perla de Río', description: 'Las perlas de río son sinónimo de elegancia natural. Cada una es única en forma y brillo, aportando sofisticación atemporal a nuestras piezas.', benefits: ['Elegancia natural', 'Brillo iridiscente', 'Cada perla es única'], type: 'perla', origin: 'China' },
        { slug: 'chapa-de-oro-18k', name: 'Chapa de Oro 18k', description: 'La chapa de oro 18k ofrece el brillo y la calidez del oro con mayor accesibilidad. Nuestras piezas están bañadas con una capa generosa que garantiza durabilidad.', benefits: ['Brillo dorado duradero', 'No mancha la piel', 'Hipoalergénico'], type: 'metal', origin: 'México' },
        { slug: 'plata-925', name: 'Plata .925', description: 'La plata esterlina .925 es un metal noble hipoalergénico. Su brillo plateado complementa cualquier piedra y se adapta a todos los estilos.', benefits: ['Metal noble hipoalergénico', 'Brillo plateado', 'Alta durabilidad'], type: 'metal', origin: 'México' },
        { slug: 'ojo-de-tigre', name: 'Ojo de Tigre', description: 'El ojo de tigre es una piedra de fuerza y protección. Sus tonos dorados y marrones crean un efecto visual fascinante conocido como chatoyancia.', benefits: ['Piedra de protección', 'Efecto óptico chatoyante', 'Tonos cálidos'], type: 'piedra', origin: 'Sudáfrica' },
        { slug: 'jade', name: 'Jade', description: 'El jade es una piedra de armonía y equilibrio, profundamente valorada en diversas culturas. Su verde sereno evoca la naturaleza y la tranquilidad.', benefits: ['Piedra de la armonía', 'Color verde sereno', 'Tradición milenaria'], type: 'piedra', origin: 'Guatemala' },
        { slug: 'hilo-de-acero', name: 'Hilo de Acero', description: 'El hilo de acero inoxidable aporta resistencia y flexibilidad a nuestras pulseras. Es hipoalergénico y mantiene su forma con el uso diario.', benefits: ['Alta resistencia', 'Flexible y cómodo', 'Hipoalergénico'], type: 'hilo', origin: 'México' },
    ]) {
        materials[mat.slug] = await prisma.material.create({ data: mat });
    }
    console.log(`Created ${Object.keys(materials).length} materials`);

    // === PRODUCTS ===
    console.log('Creating products...');

    const products = [
        // --- PULSERAS ---
        {
            slug: 'pulsera-luna-de-cuarzo',
            name: 'Pulsera Luna de Cuarzo',
            tagline: 'Delicadeza en cada detalle',
            description: 'Pulsera artesanal elaborada con cuentas de cuarzo rosa natural y detalles en chapa de oro 18k. Su diseño delicado la hace perfecta para el uso diario o como un regalo significativo.',
            price: 650,
            compareAtPrice: 780,
            size: '18cm',
            sku: 'PGN-PUL-001',
            stock: 25,
            isActive: true, isFeatured: true, isNew: true, isBestseller: true,
            benefits: ['Piedras naturales de cuarzo rosa', 'Detalles en chapa de oro 18k', 'Elaborada a mano', 'Ajustable'],
            careInstructions: 'Limpiar con paño suave y seco. Evitar contacto con perfumes, cremas y agua. Guardar en la bolsa de tela incluida.',
            material: 'Chapa de oro 18k',
            stoneType: 'Cuarzo rosa',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'cuarzo-rosa', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
                { slug: 'hilo-de-acero', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-amanecer-amatista',
            name: 'Pulsera Amanecer de Amatista',
            tagline: 'Serenidad que llevas contigo',
            description: 'Pulsera con cuentas de amatista natural y cierres en plata .925. El violeta profundo de la amatista aporta un toque de misterio y elegancia.',
            price: 580,
            size: '18cm',
            sku: 'PGN-PUL-002',
            stock: 30,
            isActive: true, isFeatured: true, isNew: false, isBestseller: true,
            benefits: ['Amatista natural', 'Cierres en plata .925', 'Hecho a mano en México', 'Diseño atemporal'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con agua, perfumes y productos químicos. Guardar separada de otras joyas.',
            material: 'Plata .925',
            stoneType: 'Amatista',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'amatista', isPrimary: true },
                { slug: 'plata-925', isPrimary: false },
                { slug: 'hilo-de-acero', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-tierra-ojo-de-tigre',
            name: 'Pulsera Tierra — Ojo de Tigre',
            tagline: 'Fuerza y carácter',
            description: 'Pulsera de ojo de tigre con acentos en chapa de oro 18k. Los tonos cálidos y el efecto chatoyante de esta piedra crean una pieza con personalidad.',
            price: 620,
            size: '19cm',
            sku: 'PGN-PUL-003',
            stock: 20,
            isActive: true, isFeatured: false, isNew: true, isBestseller: false,
            benefits: ['Ojo de tigre natural', 'Efecto visual chatoyante', 'Chapa de oro 18k', 'Unisex'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con agua y perfumes. Guardar en lugar seco.',
            material: 'Chapa de oro 18k',
            stoneType: 'Ojo de tigre',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'ojo-de-tigre', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-serenidad-jade',
            name: 'Pulsera Serenidad de Jade',
            tagline: 'Armonía en verde',
            description: 'Pulsera artesanal de jade guatemalteco con detalles minimalistas en plata .925. El verde sereno del jade complementa cualquier outfit con elegancia sutil.',
            price: 690,
            size: '17cm',
            sku: 'PGN-PUL-004',
            stock: 15,
            isActive: true, isFeatured: true, isNew: false, isBestseller: false,
            benefits: ['Jade natural guatemalteco', 'Detalles en plata .925', 'Diseño minimalista', 'Cierre ajustable'],
            careInstructions: 'El jade es una piedra delicada. Limpiar con paño húmedo suave y secar inmediatamente. Evitar golpes y productos químicos.',
            material: 'Plata .925',
            stoneType: 'Jade',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'jade', isPrimary: true },
                { slug: 'plata-925', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-perlas-clasica',
            name: 'Pulsera Perlas Clásica',
            tagline: 'Elegancia atemporal',
            description: 'Pulsera de perlas de río con broche en chapa de oro 18k. Las perlas naturales aportan un brillo iridiscente que nunca pasa de moda.',
            price: 750,
            size: '18cm',
            sku: 'PGN-PUL-005',
            stock: 18,
            isActive: true, isFeatured: true, isNew: false, isBestseller: true,
            benefits: ['Perlas de río naturales', 'Broche en chapa de oro 18k', 'Cada perla es única', 'Elegancia versátil'],
            careInstructions: 'Las perlas son delicadas. Limpiar con paño suave después de cada uso. Evitar perfumes, lacas y contacto con agua. Guardar envuelta en tela suave.',
            material: 'Chapa de oro 18k',
            stoneType: 'Perla de río',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'perla-de-rio', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-mix-bohemio',
            name: 'Pulsera Mix Bohemio',
            tagline: 'Color y personalidad',
            description: 'Pulsera artesanal que combina cuarzo rosa, amatista y jade en una pieza vibrante y llena de carácter. Perfecta para quienes aman los colores y las texturas naturales.',
            price: 720,
            size: '18cm',
            sku: 'PGN-PUL-006',
            stock: 12,
            isActive: true, isFeatured: false, isNew: true, isBestseller: false,
            benefits: ['Tres piedras naturales combinadas', 'Diseño bohemio único', 'Chapa de oro 18k', 'Hecha a mano'],
            careInstructions: 'Limpiar con paño suave y seco. Evitar contacto con agua, perfumes y cremas. Guardar en bolsa de tela.',
            material: 'Chapa de oro 18k',
            stoneType: 'Cuarzo rosa, Amatista, Jade',
            isCustomizable: false,
            availabilityLabel: 'Última pieza',
            collectionType: 'casi-unica',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'cuarzo-rosa', isPrimary: true },
                { slug: 'amatista', isPrimary: false },
                { slug: 'jade', isPrimary: false },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-minimalista-oro',
            name: 'Pulsera Minimalista Oro',
            tagline: 'Menos es más',
            description: 'Pulsera delicada con cadena fina en chapa de oro 18k y una sola cuenta de cuarzo rosa como punto focal. El diseño minimalista perfecto.',
            price: 490,
            size: '17cm',
            sku: 'PGN-PUL-007',
            stock: 35,
            isActive: true, isFeatured: false, isNew: false, isBestseller: false,
            benefits: ['Diseño minimalista', 'Chapa de oro 18k', 'Cuarzo rosa natural', 'Ideal para uso diario'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con agua y perfumes. La cadena delicada requiere cuidado especial.',
            material: 'Chapa de oro 18k',
            stoneType: 'Cuarzo rosa',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'cuarzo-rosa', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-doble-vuelta-perlas',
            name: 'Pulsera Doble Vuelta de Perlas',
            tagline: 'Doble elegancia',
            description: 'Pulsera de doble vuelta con perlas de río pequeñas intercaladas con cuentas de plata .925. Un diseño que combina tradición y modernidad.',
            price: 850,
            size: '36cm (doble vuelta)',
            sku: 'PGN-PUL-008',
            stock: 10,
            isActive: true, isFeatured: true, isNew: true, isBestseller: false,
            benefits: ['Diseño de doble vuelta', 'Perlas de río naturales', 'Detalles en plata .925', 'Pieza statement'],
            careInstructions: 'Las perlas son delicadas. Limpiar con paño suave después de cada uso. Evitar perfumes y agua. Guardar extendida para evitar deformación.',
            material: 'Plata .925',
            stoneType: 'Perla de río',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['pulseras'],
            materialLinks: [
                { slug: 'perla-de-rio', isPrimary: true },
                { slug: 'plata-925', isPrimary: false },
            ],
        },

        // --- COLLARES ---
        {
            slug: 'collar-gotas-de-perla',
            name: 'Collar Gotas de Perla',
            tagline: 'Sofisticación natural',
            description: 'Collar con perlas de río en forma de gota y cadena en chapa de oro 18k. Una pieza versátil que eleva cualquier look, desde casual hasta formal.',
            price: 950,
            compareAtPrice: 1100,
            size: '45cm',
            sku: 'PGN-COL-001',
            stock: 15,
            isActive: true, isFeatured: true, isNew: true, isBestseller: true,
            benefits: ['Perlas de río en forma de gota', 'Cadena en chapa de oro 18k', 'Versátil: casual y formal', 'Brillo natural iridiscente'],
            careInstructions: 'Las perlas requieren cuidado especial. Limpiar con paño suave húmedo después de cada uso. Evitar perfumes, lacas y contacto prolongado con agua.',
            material: 'Chapa de oro 18k',
            stoneType: 'Perla de río',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['collares'],
            materialLinks: [
                { slug: 'perla-de-rio', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'collar-cascada-de-jade',
            name: 'Collar Cascada de Jade',
            tagline: 'Verde serenidad',
            description: 'Collar con cuentas de jade graduadas que crean un efecto cascada. Los detalles en plata .925 complementan el verde sereno de esta piedra ancestral.',
            price: 870,
            size: '50cm',
            sku: 'PGN-COL-002',
            stock: 12,
            isActive: true, isFeatured: true, isNew: false, isBestseller: false,
            benefits: ['Jade guatemalteco natural', 'Cuentas graduadas', 'Detalles en plata .925', 'Pieza statement'],
            careInstructions: 'Limpiar el jade con paño húmedo y secar inmediatamente. Evitar golpes directos y productos químicos. Guardar separado de otras joyas.',
            material: 'Plata .925',
            stoneType: 'Jade',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['collares'],
            materialLinks: [
                { slug: 'jade', isPrimary: true },
                { slug: 'plata-925', isPrimary: false },
            ],
        },
        {
            slug: 'collar-amatista-solitario',
            name: 'Collar Amatista Solitario',
            tagline: 'Un punto de luz violeta',
            description: 'Collar minimalista con un solitario de amatista natural engarzado en plata .925. El diseño limpio permite que la piedra sea la protagonista absoluta.',
            price: 780,
            size: '42cm',
            sku: 'PGN-COL-003',
            stock: 20,
            isActive: true, isFeatured: false, isNew: false, isBestseller: true,
            benefits: ['Amatista natural solitaria', 'Engarzado en plata .925', 'Diseño minimalista', 'Ideal para uso diario'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con perfumes y cremas. Guardar en bolsa de tela incluida.',
            material: 'Plata .925',
            stoneType: 'Amatista',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['collares'],
            materialLinks: [
                { slug: 'amatista', isPrimary: true },
                { slug: 'plata-925', isPrimary: false },
            ],
        },
        {
            slug: 'collar-cadena-perlas-oro',
            name: 'Collar Cadena y Perlas de Oro',
            tagline: 'Clásico reinventado',
            description: 'Collar que alterna eslabones de cadena en chapa de oro 18k con secciones de perlas de río. Un diseño contemporáneo que rinde homenaje a la joyería clásica.',
            price: 1150,
            size: '48cm',
            sku: 'PGN-COL-004',
            stock: 8,
            isActive: true, isFeatured: true, isNew: true, isBestseller: false,
            benefits: ['Diseño mixto cadena + perlas', 'Chapa de oro 18k', 'Perlas de río naturales', 'Pieza premium'],
            careInstructions: 'Limpiar con paño suave. Las perlas requieren atención especial: evitar perfumes, agua y guardar envuelta en tela suave.',
            material: 'Chapa de oro 18k',
            stoneType: 'Perla de río',
            isCustomizable: false,
            availabilityLabel: 'Última pieza',
            collectionType: 'casi-unica',
            images: [],
            categories: ['collares'],
            materialLinks: [
                { slug: 'perla-de-rio', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'collar-cuarzo-rosa-largo',
            name: 'Collar Cuarzo Rosa Largo',
            tagline: 'Amor en cada cuenta',
            description: 'Collar largo con cuentas de cuarzo rosa y separadores en chapa de oro 18k. Puede usarse en una vuelta larga o en doble vuelta para un look más sofisticado.',
            price: 980,
            size: '80cm',
            sku: 'PGN-COL-005',
            stock: 14,
            isActive: true, isFeatured: false, isNew: false, isBestseller: false,
            benefits: ['Cuarzo rosa natural', 'Doble uso: largo o doble vuelta', 'Chapa de oro 18k', 'Versatilidad máxima'],
            careInstructions: 'Limpiar con paño suave y seco. Evitar contacto con agua y perfumes. Guardar extendido para evitar nudos.',
            material: 'Chapa de oro 18k',
            stoneType: 'Cuarzo rosa',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['collares'],
            materialLinks: [
                { slug: 'cuarzo-rosa', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },

        // --- SETS ---
        {
            slug: 'set-serenidad-perlas',
            name: 'Set Serenidad — Perlas',
            tagline: 'Elegancia completa',
            description: 'Conjunto de pulsera y collar de perlas de río con detalles en chapa de oro 18k. El regalo perfecto o el complemento ideal para ocasiones especiales.',
            price: 1450,
            compareAtPrice: 1700,
            size: 'Pulsera 18cm + Collar 45cm',
            sku: 'PGN-SET-001',
            stock: 10,
            isActive: true, isFeatured: true, isNew: false, isBestseller: true,
            benefits: ['Pulsera + collar a juego', 'Perlas de río naturales', 'Chapa de oro 18k', 'Empaque de regalo incluido'],
            careInstructions: 'Las perlas son delicadas. Limpiar cada pieza con paño suave después de cada uso. Evitar perfumes, lacas y agua. Guardar cada pieza por separado en tela suave.',
            material: 'Chapa de oro 18k',
            stoneType: 'Perla de río',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['sets'],
            materialLinks: [
                { slug: 'perla-de-rio', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'set-madre-e-hija-cuarzo',
            name: 'Set Madre e Hija — Cuarzo Rosa',
            tagline: 'Un lazo que se lleva en la muñeca',
            description: 'Dos pulseras de cuarzo rosa: una en tamaño adulto y otra más pequeña. Comparten el mismo diseño para simbolizar la conexión especial entre madre e hija.',
            price: 980,
            compareAtPrice: 1200,
            size: 'Adulto 18cm + Niña 15cm',
            sku: 'PGN-SET-002',
            stock: 15,
            isActive: true, isFeatured: true, isNew: true, isBestseller: true,
            benefits: ['Dos pulseras a juego', 'Cuarzo rosa natural', 'Chapa de oro 18k', 'Regalo significativo'],
            careInstructions: 'Limpiar ambas pulseras con paño suave. Evitar contacto con agua y perfumes. Guardar cada una en su bolsa de tela.',
            material: 'Chapa de oro 18k',
            stoneType: 'Cuarzo rosa',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['sets'],
            materialLinks: [
                { slug: 'cuarzo-rosa', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'set-equilibrio-amatista-jade',
            name: 'Set Equilibrio — Amatista y Jade',
            tagline: 'Dos piedras, un balance',
            description: 'Set de dos pulseras: una de amatista y otra de jade, unidas por el diseño y los detalles en plata .925. Para quienes buscan combinar colores y energías.',
            price: 1100,
            compareAtPrice: 1270,
            size: '18cm cada una',
            sku: 'PGN-SET-003',
            stock: 8,
            isActive: true, isFeatured: false, isNew: false, isBestseller: false,
            benefits: ['Dos pulseras complementarias', 'Amatista + Jade naturales', 'Plata .925', 'Se pueden usar juntas o separadas'],
            careInstructions: 'Limpiar con paño suave. Evitar agua, perfumes y productos químicos. Guardar por separado.',
            material: 'Plata .925',
            stoneType: 'Amatista, Jade',
            isCustomizable: false,
            availabilityLabel: 'Disponible',
            collectionType: 'permanente',
            images: [],
            categories: ['sets'],
            materialLinks: [
                { slug: 'amatista', isPrimary: true },
                { slug: 'jade', isPrimary: true },
                { slug: 'plata-925', isPrimary: false },
            ],
        },

        // --- PERSONALIZADOS ---
        {
            slug: 'pulsera-con-inicial',
            name: 'Pulsera con Inicial',
            tagline: 'Tu letra, tu pieza',
            description: 'Pulsera personalizable con una inicial en chapa de oro 18k y cuentas de la piedra que elijas. Escoge tu letra y tu piedra favorita para crear algo único.',
            price: 750,
            size: '18cm (ajustable)',
            sku: 'PGN-PER-001',
            stock: 50,
            isActive: true, isFeatured: true, isNew: false, isBestseller: true,
            benefits: ['Inicial personalizada', 'Elige tu piedra', 'Chapa de oro 18k', 'Pieza única'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con agua, perfumes y cremas. La inicial en chapa de oro requiere cuidado para mantener su brillo.',
            material: 'Chapa de oro 18k',
            stoneType: 'A elegir',
            isCustomizable: true,
            availabilityLabel: 'Bajo pedido',
            collectionType: 'personalizado',
            images: [],
            categories: ['personalizados'],
            materialLinks: [
                { slug: 'chapa-de-oro-18k', isPrimary: true },
                { slug: 'hilo-de-acero', isPrimary: false },
            ],
        },
        {
            slug: 'collar-nombre-personalizado',
            name: 'Collar Nombre Personalizado',
            tagline: 'Tu nombre en oro',
            description: 'Collar con tu nombre o palabra especial en chapa de oro 18k. Cadena delicada con letras elegantes hechas a mano. El regalo más personal.',
            price: 950,
            size: '45cm',
            sku: 'PGN-PER-002',
            stock: 30,
            isActive: true, isFeatured: true, isNew: true, isBestseller: false,
            benefits: ['Nombre o palabra personalizada', 'Chapa de oro 18k', 'Cadena ajustable', 'Hasta 8 letras'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con agua, perfumes y cremas. Las letras son delicadas, manejar con cuidado.',
            material: 'Chapa de oro 18k',
            stoneType: null,
            isCustomizable: true,
            availabilityLabel: 'Bajo pedido',
            collectionType: 'personalizado',
            images: [],
            categories: ['personalizados'],
            materialLinks: [
                { slug: 'chapa-de-oro-18k', isPrimary: true },
            ],
        },

        // --- TEMPORADA ---
        {
            slug: 'collar-san-valentin-corazon',
            name: 'Collar San Valentín — Corazón de Cuarzo',
            tagline: 'Para quien amas',
            description: 'Edición especial de San Valentín: collar con dije de cuarzo rosa tallado en forma de corazón y cadena en chapa de oro 18k. Incluye empaque de regalo especial.',
            price: 890,
            size: '42cm',
            sku: 'PGN-TEM-001',
            stock: 5,
            isActive: true, isFeatured: true, isNew: true, isBestseller: false,
            benefits: ['Edición limitada', 'Cuarzo rosa tallado en corazón', 'Chapa de oro 18k', 'Empaque de regalo especial'],
            careInstructions: 'Limpiar con paño suave. Evitar contacto con agua y perfumes. Guardar en la caja original.',
            material: 'Chapa de oro 18k',
            stoneType: 'Cuarzo rosa',
            isCustomizable: false,
            availabilityLabel: 'Última pieza',
            collectionType: 'temporada',
            images: [],
            categories: ['temporada'],
            materialLinks: [
                { slug: 'cuarzo-rosa', isPrimary: true },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
        {
            slug: 'pulsera-primavera-flores',
            name: 'Pulsera Primavera en Flor',
            tagline: 'Colección Primavera 2025',
            description: 'Pulsera de la colección Primavera con cuentas de jade, cuarzo rosa y perlas que evocan un jardín en flor. Detalles florales en chapa de oro 18k.',
            price: 780,
            size: '18cm',
            sku: 'PGN-TEM-002',
            stock: 8,
            isActive: true, isFeatured: false, isNew: true, isBestseller: false,
            benefits: ['Colección limitada Primavera', 'Tres piedras naturales', 'Detalles florales en oro', 'Pieza de colección'],
            careInstructions: 'Limpiar con paño suave y seco. Los detalles florales son delicados. Evitar contacto con agua y perfumes.',
            material: 'Chapa de oro 18k',
            stoneType: 'Jade, Cuarzo rosa, Perla de río',
            isCustomizable: false,
            availabilityLabel: 'Última pieza',
            collectionType: 'temporada',
            images: [],
            categories: ['temporada', 'pulseras'],
            materialLinks: [
                { slug: 'jade', isPrimary: true },
                { slug: 'cuarzo-rosa', isPrimary: false },
                { slug: 'perla-de-rio', isPrimary: false },
                { slug: 'chapa-de-oro-18k', isPrimary: false },
            ],
        },
    ];

    for (const p of products) {
        const { categories: catSlugs, materialLinks, ...productData } = p;

        const product = await prisma.product.create({
            data: {
                ...productData,
                categories: {
                    create: catSlugs.map(slug => ({
                        category: { connect: { slug } },
                    })),
                },
                materials: {
                    create: materialLinks.map(ml => ({
                        material: { connect: { slug: ml.slug } },
                        isPrimary: ml.isPrimary,
                    })),
                },
            },
        });

        console.log(`Created: ${product.name}`);
    }

    console.log(`Created ${products.length} products`);

    // === BANNERS ===
    console.log('Creating banners...');
    await prisma.banner.createMany({
        data: [
            {
                title: 'Piezas que cuentan\nhistorias',
                subtitle: 'Joyería artesanal elaborada a mano con piedras semipreciosas, perlas y chapa de oro.',
                ctaText: 'Ver Colección',
                ctaLink: '/tienda',
                position: 'hero',
                sortOrder: 1,
                isActive: true,
            },
            {
                title: 'Colección\nPrimavera 2025',
                subtitle: 'Nuevas piezas inspiradas en la naturaleza y los colores de la temporada.',
                ctaText: 'Descubrir',
                ctaLink: '/tienda?collection=temporada',
                position: 'hero',
                sortOrder: 2,
                isActive: true,
            },
            {
                title: 'Diseña tu\npieza única',
                subtitle: 'Elige tu piedra, tu inicial y crea algo que sea solo tuyo.',
                ctaText: 'Personalizar',
                ctaLink: '/personalizados',
                position: 'hero',
                sortOrder: 3,
                isActive: true,
            },
        ],
    });

    console.log('Created 3 banners');
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
