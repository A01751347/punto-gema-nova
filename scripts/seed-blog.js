const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const posts = [
    {
        title: "¿Por qué elegimos piedras semipreciosas?",
        slug: "por-que-elegimos-piedras-semipreciosas",
        excerpt: "Más allá de la estética: el valor real de trabajar con cuarzo, amatista, jade y perlas naturales.",
        content: `
# ¿Por qué elegimos piedras semipreciosas?

En un mercado lleno de bisutería con materiales sintéticos, elegir piedras semipreciosas naturales es una decisión consciente. No es solo una cuestión de apariencia — es una cuestión de calidad, autenticidad y conexión con la naturaleza.

## Cada piedra es única

A diferencia de las cuentas de vidrio o plástico, cada piedra semipreciosa tiene variaciones naturales de color, textura e incluso forma. Esto significa que cada pieza de joyería que elaboramos es verdaderamente única.

## Propiedades que van más allá de lo visual

### Cuarzo Rosa
Conocida como la piedra del amor. Su tono rosado suave aporta calidez y feminidad a cualquier pieza.

### Amatista
Su violeta profundo no solo es hermoso — es una piedra asociada con la serenidad y la claridad mental.

### Jade
Valorada desde hace milenios en culturas de todo el mundo. El jade guatemalteco que utilizamos tiene un verde sereno que evoca la naturaleza.

### Perlas de Río
Cada perla es formada naturalmente, lo que le da un brillo iridiscente imposible de replicar artificialmente.

## Nuestro compromiso

En Punto Gema Nova, seleccionamos cada piedra individualmente. Verificamos su autenticidad, su color y su calidad antes de incorporarla a una pieza. Es un proceso más lento, pero el resultado se nota.
        `,
        featuredImage: null,
        category: "Materiales",
        tags: ["Piedras Semipreciosas", "Cuarzo", "Amatista", "Materiales"],
        publishedAt: new Date("2025-01-15T10:00:00Z"),
        isPublished: true
    },
    {
        title: "Cómo cuidar tu joyería artesanal",
        slug: "como-cuidar-tu-joyeria-artesanal",
        excerpt: "Guía práctica para que tus piezas se mantengan hermosas por mucho más tiempo.",
        content: `
# Cómo cuidar tu joyería artesanal

Tus piezas de Punto Gema Nova están hechas para durar, pero como cualquier joya de calidad, necesitan un poco de amor y cuidado. Aquí te compartimos los mejores consejos.

## Regla #1: Última en ponerse, primera en quitarse

Esto significa: ponte tu joyería después de aplicar perfume, crema, maquillaje y fijador de cabello. Y quítatela antes de bañarte, hacer ejercicio o dormir.

## Cuidado según el material

### Chapa de Oro 18k
- Limpia con un paño suave y seco después de cada uso
- Evita el contacto con cloro, agua salada y productos químicos
- Guarda cada pieza por separado para evitar rayones

### Plata .925
- La plata se oscurece naturalmente con el tiempo — es normal
- Usa un paño para plata para recuperar su brillo
- Guarda en bolsa hermética cuando no la uses

### Piedras Semipreciosas
- Limpia con paño suave ligeramente húmedo
- Evita golpes directos que puedan astillar la piedra
- Algunas piedras (como la amatista) pueden perder color con exposición solar prolongada

### Perlas
- Son las más delicadas de todos nuestros materiales
- Limpia con paño suave después de CADA uso
- Nunca las sumerjas en agua
- Guárdalas envueltas en tela suave, separadas de otras joyas

## Almacenamiento

Guarda tus piezas en las bolsas de tela que incluimos con cada compra. Evita amontonar varias piezas juntas — pueden rayarse entre sí.

Con estos cuidados simples, tus piezas lucirán hermosas durante años.
        `,
        featuredImage: null,
        category: "Cuidado",
        tags: ["Cuidado", "Consejos", "Mantenimiento"],
        publishedAt: new Date("2025-02-01T10:00:00Z"),
        isPublished: true
    },
    {
        title: "El arte de regalar joyería con significado",
        slug: "arte-de-regalar-joyeria-con-significado",
        excerpt: "Ideas y consejos para elegir la pieza perfecta según la persona y la ocasión.",
        content: `
# El arte de regalar joyería con significado

Regalar joyería es un gesto que va más allá de lo material. Una pieza bien elegida puede convertirse en un objeto con historia, un recordatorio tangible de un momento especial.

## ¿Para quién es el regalo?

### Para mamá
Los sets son ideales: una pulsera y un collar que combinen. El Set Serenidad de Perlas es nuestra opción más popular para el Día de las Madres. Si quieres algo aún más especial, el Set Madre e Hija es un regalo que cuenta una historia.

### Para tu mejor amiga
Las pulseras de piedras naturales son perfectas. El cuarzo rosa (amor) o la amatista (serenidad) tienen significados que puedes incluir en una tarjeta personalizada.

### Para tu pareja
Los collares de perlas son un clásico que nunca falla. Si buscas algo más personal, una pieza con inicial es un detalle íntimo y elegante.

### Para ti misma
¡No necesitas una excusa! Elegir una pieza que te guste es un acto de autocuidado. La Pulsera Minimalista Oro es perfecta para uso diario.

## Nuestro empaque

Cada pieza de Punto Gema Nova llega en una caja de presentación elegante con interior acolchado. Incluimos una bolsa de tela para almacenamiento y una tarjeta con las propiedades de las piedras utilizadas.

Si es un regalo, podemos incluir una tarjeta con mensaje personalizado — solo agrégalo en las notas de tu pedido.
        `,
        featuredImage: null,
        category: "Ideas",
        tags: ["Regalos", "Ideas", "Guía"],
        publishedAt: new Date("2025-02-20T10:00:00Z"),
        isPublished: true
    },
    {
        title: "Chapa de oro vs. oro sólido: ¿Cuál es la diferencia?",
        slug: "chapa-de-oro-vs-oro-solido",
        excerpt: "Todo lo que necesitas saber sobre la chapa de oro 18k y por qué es una excelente opción.",
        content: `
# Chapa de oro vs. oro sólido

Una de las preguntas más frecuentes que recibimos es sobre la diferencia entre chapa de oro y oro sólido. Aquí te explicamos todo de forma clara y honesta.

## ¿Qué es la chapa de oro 18k?

La chapa de oro (también llamada gold-filled en inglés) consiste en una capa gruesa de oro real adherida mecánicamente a un metal base. En nuestro caso, usamos chapa de oro de 18 quilates.

## ¿Cuál es la diferencia con el oro sólido?

El oro sólido de 18k está compuesto por 75% de oro puro. Es más caro porque usa más material precioso. La chapa de oro tiene una cantidad menor de oro, pero la capa es lo suficientemente gruesa para ofrecer durabilidad y un brillo idéntico.

## ¿Por qué elegimos chapa de oro?

1. **Accesibilidad:** Permite ofrecer piezas con el look y la calidad del oro a precios más accesibles
2. **Durabilidad:** Una buena chapa de oro dura años con el cuidado adecuado
3. **Hipoalergénica:** La capa de oro protege la piel del contacto con el metal base
4. **Sustentabilidad:** Usa menos oro, lo que tiene menor impacto ambiental

## ¿Cuánto dura?

Con el cuidado adecuado (evitar agua, perfumes y productos químicos), nuestras piezas en chapa de oro mantienen su brillo durante años. No es lo mismo que el "baño de oro" económico que se desgasta en semanas.

## Nuestra promesa

Somos transparentes con nuestros materiales. Cada pieza indica claramente si es chapa de oro 18k o plata .925. Creemos que la honestidad es la base de la confianza.
        `,
        featuredImage: null,
        category: "Educación",
        tags: ["Chapa de Oro", "Materiales", "Educación"],
        publishedAt: new Date("2025-03-10T10:00:00Z"),
        isPublished: true
    }
];

async function main() {
    console.log('Seeding blog posts...');

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
