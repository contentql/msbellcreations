// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Stripe from 'stripe';

const stripe = new Stripe(process.env.SRTIPE_TOKEN);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
// axios.defaults.headers.common.Authorization = process.env.STRAPI_TOKEN;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export async function POST(req) {
  const { email, products: userSentProducts } = await req.json();
  try {
    const { data } = await axios.get('/api/products');
    const allProducts = await data.data;
    const requiredProducts = await allProducts.filter((product) =>
      userSentProducts.map((purchasingProduct) => purchasingProduct.id).includes(product.id)
    );


    
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: requiredProducts.map((requiredProduct) => {
        const price_data = {
          currency: 'usd',
          product_data: {
            name: requiredProduct.name,
          },
          unit_amount: Math.round(requiredProduct.price * 100),
        };

        const { quantity } = userSentProducts.find((product) => product.id === requiredProduct.id);

        return { price_data, quantity };
      }),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-completed`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    // return redirect(session.url);
    return Response.json(session);
  } catch (error) {
    console.log(error);
  }
}
