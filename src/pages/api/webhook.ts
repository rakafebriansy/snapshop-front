import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../lib/mongoose";
import { buffer } from "micro";
import { Order } from "../../models/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// stripe listen --forward-to localhost:3000/api/webhook

export const config = {
    api: { bodyParser: false },
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        const rawBody = await buffer(req);

        // console.log('Raw body: ', rawBody.toString());
        // console.log('Signature: ', sig);
        // console.log('First few chars of webhook secret:', process.env.STRIPE_WEBHOOK_SECRET);

        event = stripe.webhooks.constructEvent(rawBody, sig as string, 'whsec_2520a83d7c08190a1eb91c2cf4cef57fa20e4046b24380ebfab9738f2d1212f6');
        // console.log('Webhook Event Received: ' + event.toString());
        // console.log('type:' +event.type);

        await mongooseConnect();

        switch (event.type) {
            case 'checkout.session.completed':
                const data = event.data.object;
                const orderId = data.metadata.orderId;
                const paid = data.payment_status === 'paid';
                if(orderId && paid) {
                    await Order.findByIdAndUpdate(orderId, {
                        paid: true
                    });
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }


    res.status(200).json({ received: true });
}