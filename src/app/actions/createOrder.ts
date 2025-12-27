'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import { createPreference } from '@/lib/payment/mercadopago';

const shippingSchema = z.object({
    firstName: z.string().min(2, "El nombre es requerido"),
    lastName: z.string().min(2, "El apellido es requerido"),
    email: z.string().email("Email inválido"), // Guest checkout for now
    address: z.string().min(5, "La dirección es requerida"),
    city: z.string().min(2, "La ciudad es requerida"),
    state: z.string().min(2, "El estado es requerido"),
    postalCode: z.string().min(4, "Código postal requerido"),
    phone: z.string().min(10, "Teléfono requerido"),
});

export async function createOrder(prevState: any, formData: FormData) {
    // 1. Validate Form Data
    const rawData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        postalCode: formData.get('postalCode'),
        phone: formData.get('phone'),
    };

    const validation = shippingSchema.safeParse(rawData);

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Por favor revisa los campos.',
        };
    }

    // 2. Parse Cart Data (Sent as a hidden JSON field for simplicity in this server action approach)
    // In a more robust app, we might validate prices against DB again here.
    const cartItemsJson = formData.get('cartItems') as string;
    let cartItems: { id: string; quantity: number }[] = [];
    try {
        cartItems = JSON.parse(cartItemsJson);
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            throw new Error("Cart empty");
        }
    } catch (e) {
        return { message: "Error procesando el carrito." };
    }

    const { firstName, lastName, email, address, city, state, postalCode, phone } = validation.data;

    // Calculate totals (re-calculating on server for safety)
    // Fetch products to get real prices
    const productIds = cartItems.map((item: any) => item.id);
    const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } }
    });

    let subtotal = 0;
    const orderItemsData: { productId: string; name: string; sku: string; price: number; quantity: number }[] = [];

    for (const item of cartItems) {
        const product = dbProducts.find(p => p.id === item.id);
        if (product) {
            const price = product.price; // Use DB price
            subtotal += price * item.quantity;
            orderItemsData.push({
                productId: product.id,
                name: product.name,
                sku: product.sku,
                price: price,
                quantity: item.quantity
            });
        }
    }

    // Prices are tax inclusive
    const grossProductTotal = subtotal;
    const shippingCost = grossProductTotal > 999 ? 0 : 150;

    const netSubtotal = grossProductTotal / 1.16;
    const tax = grossProductTotal - netSubtotal;
    const total = grossProductTotal + shippingCost;

    let orderId = '';

    try {
        // 3. Database Transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create Address (using a "Guest" logic or linking if we had user ID)
            // For this phase, we create a new address record per order or reuse if easy.
            // Let's simplified: create Order with embedded shipping details if schema allows, 
            // or create Address entity. Schema has Address relation.

            // Since our User schema requires userId for Address, but we are doing guest checkout support...
            // We have a problem: Schema says Address.userId is String (likely required?).
            // Let's check schema. Address.userId is String (NOT optional).
            // Workaround: We will use a "Guest User" or update schema. 
            // Or correct approach: Order has `shippingAddress` relation, but maybe we can just store basics if needed?
            // Actually schema says: `shippingAddress Address?` (optional relation).
            // But we don't have fields on Order for address text.
            // Solution for Phase 1 MVP: We will create a "Guest" user or find a way.
            // Better: Check if we can create an Address without User? 
            // Schema: `userId String` in Address. So Address MUST belong to a User.

            // Hack/MVP Decision: We will create a temporary "Guest" user if not logged in, 
            // OR (better for now) just skip Address creation and update Order model to support inline address string 
            // if we can't change schema easily. 
            // Wait, I can change schema. But I want to avoid migrations if I can help it.
            // Let's look at Order model again.
            // `guestEmail String?`.
            // If I can't create Address, I can't link it.
            // Let's create a dummy "Guest" user or find an existing one? No, that's messy.

            // REALISTIC MVP FIX: Modify Create Order to NOT require Address relation if it's too complex, 
            // but I have to store it somewhere.
            // Let's create a User for this email if it doesn't exist? 
            // Or just creating an Address requires a valid User ID.

            // Let's just create a `User` record for the guest if it doesn't exist?
            // That requires a unique email.

            let user = await tx.user.findUnique({ where: { email: email as string } });
            if (!user) {
                // Create guest user
                user = await tx.user.create({
                    data: {
                        email: email as string,
                        cognitoId: `guest_${Date.now()}_${Math.random()}`, // Fake ID for now
                        firstName: firstName as string,
                        lastName: lastName as string,
                        role: 'CUSTOMER',
                        phone: phone as string,
                    }
                });
            } else {
                // Update existing user with latest contact info
                await tx.user.update({
                    where: { id: user.id },
                    data: {
                        firstName: firstName as string,
                        lastName: lastName as string,
                        phone: phone as string,
                    }
                });
            }

            // Now create address attached to this user
            const newAddress = await tx.address.create({
                data: {
                    userId: user.id,
                    firstName: firstName as string,
                    lastName: lastName as string,
                    address1: address as string,
                    city: city as string,
                    state: state as string,
                    postalCode: postalCode as string,
                    country: 'MX',
                    phone: phone as string,
                }
            });

            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    orderNumber: `ORD-${Date.now()}`, // Simple generator
                    userId: user.id, // Linked to the (possibly new) user
                    guestEmail: email as string,
                    shippingAddressId: newAddress.id,
                    shippingMethod: 'Standard',
                    shippingCost: shippingCost,
                    subtotal: netSubtotal, // Storing NET subtotal
                    tax: tax,
                    total: total,
                    paymentMethod: 'mercadopago',
                    paymentStatus: 'PENDING',
                    status: 'PENDING',
                    items: {
                        create: orderItemsData
                    }
                }
            });



            return newOrder;
        });

        orderId = result.id;

        // 4. Create Mercado Pago Preference
        console.log('[CreateOrder] Creating preference for Order ID:', orderId);
        const preference = await createPreference(
            orderId,
            orderItemsData,
            { firstName, lastName, email, phone, address, postalCode, city }
        );
        console.log('[CreateOrder] Preference created:', JSON.stringify(preference, null, 2));

        if (preference.init_point) {
            redirect(preference.init_point);
        } else {
            throw new Error('No se pudo generar el link de pago');
        }

    } catch (e: any) {
        // If it's a redirect error, let it pass (Next.js internals)
        if (e.message === 'NEXT_REDIRECT') {
            throw e;
        }

        console.error('[CreateOrder] Error:', e); // Keep original object logging for full details in server console

        if (e.status === 409) {
            return { message: "Error: La orden ya fue procesada o conflicto de datos." };
        }

        if (e.code === 'PA_UNAUTHORIZED_RESULT_FROM_POLICIES' || e.status === 403) {
            console.error('[CreateOrder] MP Auth Error: Check your MERCADOPAGO_ACCESS_TOKEN. Is it a Production token? Have you completed Identity Verification (KYC)?');
            return { message: "Error de autorización con Mercado Pago (403). El token de acceso puede ser inválido o faltan permisos (KYC)." };
        }

        return { message: "Error procesando la orden. Intenta nuevamente o contacta soporte." };
    }
}
