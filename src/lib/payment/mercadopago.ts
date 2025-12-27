import MercadoPagoConfig, { Preference } from 'mercadopago';

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

console.log('[MercadoPagoConfig] Initializing with token length:', accessToken?.length || 0);
console.log('[MercadoPagoConfig] Token starts with:', accessToken?.substring(0, 10) + '...');

if (!accessToken) {
    console.error('[MercadoPagoConfig] ERROR: MERCADOPAGO_ACCESS_TOKEN is missing in environment variables.');
}

const client = new MercadoPagoConfig({
    accessToken: accessToken || '',
    options: { timeout: 5000 }
});

export const createPreference = async (orderId: string, items: any[], payer: any) => {
    const preference = new Preference(client);

    const preferenceData = {
        body: {
            items: items.map(item => ({
                id: item.productId,
                title: item.name,
                unit_price: Number(item.price),
                quantity: Number(item.quantity),
                currency_id: 'MXN'
            })),
            payer: {
                name: payer.firstName,
                surname: payer.lastName,
                email: payer.email
                // Removed address to minimize errors
            },
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success/${orderId}`,
                failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure/${orderId}`,
                pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending/${orderId}`
            },
            auto_return: 'approved',
            external_reference: orderId
        }
    };

    // @ts-ignore - SDK types might mismatch slightly with "auto_return" string vs enum, keeping simple
    const result = await preference.create(preferenceData);
    return result;
};
