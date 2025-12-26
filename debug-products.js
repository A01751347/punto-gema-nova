const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany();
    console.log('--- PRODUCTS ---');
    products.forEach(p => {
        console.log(`ID: ${p.id}`);
        console.log(`Slug: ${p.slug}`);
        console.log(`Name: ${p.name}`);
        console.log(`Images (${p.images.length}):`, p.images);
        console.log('----------------');
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
