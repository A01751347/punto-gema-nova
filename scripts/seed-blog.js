const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const posts = [
    {
        title: "¿Por qué tu piel necesita ácidos grasos?",
        slug: "por-que-tu-piel-necesita-acidos-grasos",
        excerpt: "Más allá de la hidratación superficial: cómo los lípidos reparan la estructura celular dañada.",
        content: `
# ¿Por qué tu piel necesita ácidos grasos?

No todos los aceites son iguales. En el mundo de la cosmética, existe un mito persistente de que la grasa es enemiga de una piel sana. Nada podría estar más lejos de la verdad.

## La barrera lipídica

Tu piel tiene una barrera natural compuesta principalmente por ceramidas, colesterol y ácidos grasos. Esta barrera es lo único que impide que tu agua interna se evapore y que los patógenos externos entren.

Cuando limpiamos nuestra piel en exceso o usamos productos agresivos, esta barrera se rompe. El resultado no es solo sequedad, sino inflamación, sensibilidad y envejecimiento prematuro.

## Opuntia Ficus-Indica: Una fuente superior

Aquí es donde entra el aceite de semilla de tuna. A diferencia de otros aceites que son oclusivos (simplemente se asientan encima), este aceite es rico en ácido linoleico.

El ácido linoleico es un ácido graso esencial que nuestro cuerpo no puede producir. Es fundamental para reparar la barrera cutánea sin obstruir los poros.

### Beneficios clave:

1.  **Restauración:** Ayuda a reconstruir el cemento intercelular.
2.  **Anti-inflamatorio:** Calma rojeces y reactividad.
3.  **No comedogénico:** Penetra rápidamente sin causar brotes.

En YUTNÜÜ, formulamos pensando en biología, no en tendencias. Añadir ácidos grasos de calidad a tu rutina es devolverle a tu piel las herramientas que necesita para defenderse sola.
        `,
        featuredImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop",
        category: "Ciencia",
        tags: ["Ácidos Grasos", "Barrera Cutánea", "Ciencia"],
        publishedAt: new Date("2024-10-12T10:00:00Z"),
        isPublished: true
    },
    {
        title: "La cosecha de la tuna: Una tradición en riesgo",
        slug: "cosecha-tuna-tradicion-riesgo",
        excerpt: "Visitamos a nuestros productores en San Luis Potosí para entender el ciclo de vida del nopal.",
        content: `
# La cosecha de la tuna

El sol de San Luis Potosí no perdona. A las 6 de la mañana, ya se siente el calor que caracterizará el resto del día. Es aquí, en estas tierras áridas, donde sucede la magia.

## Más que una planta

El nopal no es un cultivo cualquiera; es un símbolo de identidad y resistencia. Para obtener el aceite que usamos en YUTNÜÜ, se requiere un proceso meticuloso.

Primero, la fruta debe madurar en la planta. No se puede cortar verde. Una vez cosechada, se separan las semillas de la pulpa. Las semillas se lavan y se secan al sol durante días.

## Un proceso lento

Se necesitan aproximadamente una tonelada de fruta para obtener un litro de aceite puro. Es un rendimiento bajísimo, lo que explica por qué este "oro líquido" es tan preciado.

Nuestros productores no usan agroquímicos. No porque sea una moda, sino porque así lo han hecho durante generaciones. Respetar la tierra significa asegurar que habrá cosecha el próximo año.

Al elegir nuestros productos, estás apoyando directamente a estas familias y la preservación de una técnica agrícola que está en riesgo de desaparecer ante la agricultura industrial intensiva.
        `,
        featuredImage: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2576&auto=format&fit=crop",
        category: "Origen",
        tags: ["Sustentabilidad", "Origen", "México"],
        publishedAt: new Date("2024-09-28T10:00:00Z"),
        isPublished: true
    },
    {
        title: "Simplicidad Radical: Menos productos, más resultados",
        slug: "simplicidad-radical-skinimalism",
        excerpt: "La tendencia del 'Skinimalism' llegó para quedarse. Aprende a depurar tu tocador.",
        content: `
# Simplicidad Radical

¿Cuántos pasos tiene tu rutina? ¿7? ¿10? ¿12?

En los últimos años, la industria de la belleza nos ha convencido de que necesitamos un producto específico para cada centímetro de piel y para cada momento del día.

## El costo de la complejidad

Sobrecargar la piel con activos puede ser contraproducente. Mezclar demasiados ingredientes aumenta el riesgo de irritación y hace imposible saber qué está funcionando y qué no.

El "Skinimalism" no se trata de no cuidarse. Se trata de usar pocos productos, pero multifuncionales y de altísima calidad.

## Tu nueva rutina base

Solo necesitas tres pasos reales:

1.  **Limpiar:** Sin agredir.
2.  **Tratar/Hidratar:** Un buen suero o crema que aporte agua y activos.
3.  **Proteger/Sellar:** SPF de día, Aceite de noche.

Eso es todo. La piel es un órgano sabio; a veces solo necesita que nos quitemos de en medio y la dejemos trabajar.
        `,
        featuredImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=2670&auto=format&fit=crop",
        category: "Estilo de Vida",
        tags: ["Minimalismo", "Rutina", "Consejos"],
        publishedAt: new Date("2024-09-15T10:00:00Z"),
        isPublished: true
    },
    {
        title: "Vitamina E vs. Vitamina C: ¿Cuál necesitas?",
        slug: "vitamina-e-vs-vitamina-c",
        excerpt: "Desmitificando los antioxidantes. Cuándo usar cada uno y cómo combinarlos.",
        content: `
# Vitamina E vs. Vitamina C

Son los dos gigantes del mundo antioxidante. Ambos prometen iluminar, proteger y rejuvenecer. Pero, ¿son intercambiables?

## Vitamina C: El escudo diurno

La Vitamina C (ácido ascórbico) es soluble en agua. Su principal función es neutralizar los radicales libres generados por el sol y la contaminación *antes* de que dañen tu ADN. También es clave para la producción de colágeno.

## Vitamina E: El reparador

La Vitamina E (tocoferol) es soluble en grasa. Es la guardiana de las membranas celulares. Hidrata, calma y repara el daño ya hecho.

## ¿La pareja perfecta?

La respuesta corta es: necesitas ambos. De hecho, funcionan mejor juntos. La Vitamina E ayuda a estabilizar la Vitamina C, y la Vitamina C regenera la Vitamina E oxidada.

Nuestro Aceite de Tuna tiene una concentración natural de Vitamina E del 150% superior al Argán. Combinarlo con un suero de Vitamina C por la mañana crea un escudo antioxidante impenetrable.
        `,
        featuredImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop",
        category: "Ingredientes",
        tags: ["Vitamina E", "Vitamina C", "Educación"],
        publishedAt: new Date("2024-09-02T10:00:00Z"),
        isPublished: true
    }
];

async function main() {
    console.log('Seeding blog posts...');

    // Clean up first
    await prisma.blogPost.deleteMany({});

    for (const post of posts) {
        await prisma.blogPost.create({
            data: post
        });
        console.log(`Created post: ${post.title}`);
    }

    console.log('Blog seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
