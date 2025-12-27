import MercadoPagoConfig, { Preference, Payment } from 'mercadopago';

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!accessToken) {
    console.error("[MercadoPago] ERROR: MERCADOPAGO_ACCESS_TOKEN is not defined in environment variables.");
}

const client = new MercadoPagoConfig({
    accessToken: accessToken || '',
    options: { timeout: 10000 }
});

export const getPayment = async (paymentId: string) => {
    const payment = new Payment(client);
    return await payment.get({ id: paymentId });
}

export const createPreference = async (orderId: string, items: any[], payer: any) => {
    const preference = new Preference(client);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const preferenceData = {
        body: {
            // Items: What is being sold
            items: items.map(item => ({
                id: item.productId,
                title: item.name,
                unit_price: Number(item.price),
                quantity: Number(item.quantity),
                currency_id: 'MXN'
            })),
            // Payer: Who is buying
            payer: {
                name: payer.firstName,
                surname: payer.lastName,
                email: payer.email,
                // Adding phone helps with fraud prevention
                phone: {
                    area_code: '',
                    number: payer.phone
                },
                address: {
                    zip_code: payer.postalCode,
                    street_name: payer.address,
                    // street_number: '123' // Optional if not separated
                }
            },
            // Back URLs: Where to return after payment
            back_urls: {
                success: `${appUrl}/checkout/success/${orderId}`,
                failure: `${appUrl}/checkout/failure/${orderId}`,
                pending: `${appUrl}/checkout/pending/${orderId}`
            },
            auto_return: 'approved',
            external_reference: orderId,
            statement_descriptor: 'CREMAS SHOP', // Changes what user sees on bank statement
            expires: false,
        }
    };

    try {
        const result = await preference.create(preferenceData);
        return result;
    } catch (error: any) {
        console.error('[MercadoPago] Error creating preference:', JSON.stringify(error, null, 2));
        throw error;
    }
};
