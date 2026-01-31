import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding dummy orders...');

    // 1. Get or create a user to assign orders to (optional, or use guestEmail)
    // For this example, we'll try to find an existing user or create a dummy one.
    const user = await prisma.user.upsert({
        where: { email: 'mino@gmail.com' },
        update: {},
        create: {
            email: 'mino@gmail.com',
            firstName: 'Mino',
            lastName: 'Usuario',
            cognitoId: 'dummy-cognito-id-mino', // Dummy ID
            role: 'CUSTOMER',
        },
    });

    // 2. Get some products to add to orders
    const products = await prisma.product.findMany({ take: 3 });

    if (products.length === 0) {
        console.error('No products found. Please seed products first.');
        return;
    }

    // 3. Create Dummy Orders

    // Order 1: Delivered
    await prisma.order.create({
        data: {
            orderNumber: `ORD-${Date.now()}-001`,
            userId: user.id,
            guestEmail: user.email,
            status: 'DELIVERED',
            paymentStatus: 'COMPLETED',
            paymentMethod: 'credit_card',
            subtotal: products[0].price,
            shippingCost: 0,
            shippingMethod: 'Standard', // Added
            total: products[0].price,
            trackingNumber: 'FedEx-9876543210',
            items: {
                create: [
                    {
                        productId: products[0].id,
                        name: products[0].name,
                        sku: products[0].sku,
                        price: products[0].price,
                        quantity: 1,
                    },
                ],
            },
        },
    });
    console.log('Created Order 1: DELIVERED');

    // Order 2: Shipped (Multi-item)
    await prisma.order.create({
        data: {
            orderNumber: `ORD-${Date.now()}-002`,
            userId: user.id,
            guestEmail: user.email,
            status: 'SHIPPED',
            paymentStatus: 'COMPLETED',
            paymentMethod: 'paypal',
            subtotal: products[0].price + (products[1]?.price || 0),
            shippingCost: 150,
            shippingMethod: 'Express', // Added
            total: products[0].price + (products[1]?.price || 0) + 150,
            trackingNumber: 'DHL-1234567890',
            items: {
                create: [
                    {
                        productId: products[0].id,
                        name: products[0].name,
                        sku: products[0].sku,
                        price: products[0].price,
                        quantity: 1,
                    },
                    ...(products[1] ? [{
                        productId: products[1].id,
                        name: products[1].name,
                        sku: products[1].sku,
                        price: products[1].price,
                        quantity: 2,
                    }] : []),
                ],
            },
        },
    });
    console.log('Created Order 2: SHIPPED');

    // Order 3: Processing
    await prisma.order.create({
        data: {
            orderNumber: `ORD-${Date.now()}-003`,
            userId: user.id,
            guestEmail: user.email, // Also link guest email for testing unauth tracking
            status: 'PROCESSING',
            paymentStatus: 'COMPLETED',
            paymentMethod: 'mercadopago',
            subtotal: products[0].price * 2,
            shippingCost: 0,
            shippingMethod: 'Standard', // Added
            total: products[0].price * 2,
            items: {
                create: [
                    {
                        productId: products[0].id,
                        name: products[0].name,
                        sku: products[0].sku,
                        price: products[0].price,
                        quantity: 2,
                    },
                ],
            },
        },
    });
    console.log('Created Order 3: PROCESSING');

    console.log('Dummy orders created successfully for mino@gmail.com');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
