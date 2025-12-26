const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany({});
    console.log('Products found:', products.length);
    products.forEach(p => console.log(`- ${p.name} (${p.slug})`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
