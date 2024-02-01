// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Stripe from 'stripe';

const stripe = new Stripe(process.env.SRTIPE_TOKEN);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
// axios.defaults.headers.common.Authorization = process.env.STRAPI_TOKEN;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export async function POST(req) {
  const { email, products: userSentProducts, tax:tax, total:total, shipping:shipping } = await req.json();
  console.log("total",total)
  try {
    const { data } = await axios.get('/api/products');
    const allProducts = await data.data;
    const requiredProducts = await allProducts.filter((product) =>
      userSentProducts.map((purchasingProduct) => purchasingProduct.id).includes(product.id)
    );

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        // Product line items (unchanged)
        ...requiredProducts.map((requiredProduct) => {
          const price_data = {
            currency: 'usd',
            product_data: {
              name: requiredProduct.name,
            },
            unit_amount: Math.round(requiredProduct.price * 100),
            tax_behavior: "exclusive",
          };

          const { quantity } = userSentProducts.find((product) => product.id === requiredProduct.id);

          return { price_data, quantity };
        }),
        // Tax line item
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tax',
            },
            unit_amount: parseInt((total*tax)), // 100 USD in cents
          },
          quantity: 1,
        },
         {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shipping Cost',
            },
            unit_amount: shipping*100, // 100 USD in cents
          },
          quantity: 1,
        },
      ],
      // automatic_tax section removed
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-completed`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cart`,
    });

    // return redirect(session.url);
    return Response.json(session);
  } catch (error) {
    console.log(error);
  }
}
