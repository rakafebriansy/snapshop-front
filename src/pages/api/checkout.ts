import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../lib/mongoose";
import { Product, ProductDoc } from "../../models/Product";
import { Order, OrderDoc } from "../../models/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type LineItems = {
    quantity: number, price_data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ url: string }>,
) {
    if (req.method !== 'POST') {
        return res.status(404);
    }

    const { name, email, city, postalCode, streetAddress, country, products } = req.body;
    await mongooseConnect();

    const productIds: string[] = (products as string).split(',');
    const uniqueIds: string[] = [...new Set(productIds)];
    const productInfos: ProductDoc[] = await Product.find({ _id: uniqueIds });

    let lineItems: LineItems[] = [];
    for (const productId of uniqueIds) {
        const productInfo: ProductDoc | undefined = productInfos.find(p => p._id.toString() === productId);
        const quantity: number = productIds.filter(id => id === productId).length;
        if (productInfo && quantity > 0) {
            lineItems.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: productInfo.name
                    },
                    unit_amount: productInfo.price * 100,
                }
            });
        }
    }

    const orderDoc: OrderDoc = await Order.create({
        line_items: lineItems, name, email, city, postalCode, streetAddress, country, paid: false
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString() },
    });

    res.status(200).json({ url: session.url });
}
