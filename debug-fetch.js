const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const slug = 'suero-hidratante-acido-hialuronico';
    console.log(`Fetching slug: ${slug}`);
    const product = await prisma.product.findFirst({
        where: { slug: slug }
    });
    console.log('--- RESULT ---');
    if (product) {
        console.log(`ID: ${product.id}`);
        console.log(`Name: ${product.name}`);
        console.log(`Slug: ${product.slug}`);
    } else {
        console.log('Not found');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
