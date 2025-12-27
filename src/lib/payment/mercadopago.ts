import MercadoPagoConfig, { Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
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
                email: payer.email,
                phone: {
                    area_code: '',
                    number: payer.phone
                },
                address: {
                    zip_code: payer.postalCode,
                    street_name: payer.address,
                    city_name: payer.city
                }
            },
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success/${orderId}`,
                failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure/${orderId}`,
                pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending/${orderId}`
            },
            auto_return: 'approved',
            external_reference: orderId,
            statement_descriptor: 'YUTNUU',
            payment_methods: {
                excluded_payment_types: [],
                installments: 12
            }
        }
    };

    // @ts-ignore - SDK types might mismatch slightly with "auto_return" string vs enum, keeping simple
    const result = await preference.create(preferenceData);
    return result;
};
