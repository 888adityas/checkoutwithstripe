import express from "express";
import stripe from "stripe";

const router = express.Router();

// router.post("/", async (req, res) => {
//   const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
//   const Stripe = stripe(STRIPE_SECRET_KEY);
//   const CLIENT_ENDPOINT = process.env.CLIENT_ENDPOINT;

//   const { items, email } = req.body;

//   //   test run
//   //   return res.json({ items, email });

//   const lineItems = items?.map((item) => {
//     return {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     };
//   });

//   const session = await Stripe.checkout.sessions.create({
//     success_url: `${CLIENT_ENDPOINT}/ordersuccessfull?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${CLIENT_ENDPOINT}/ordercancelled`,
//     payment_method_types: ["card"],
//     customer_email: email,
//     line_items: lineItems,
//     mode: "payment",
//     payment_intent_data: {
//       metadata: {
//         customerEmail: email,
//       },
//     },
//   });

//   res.json({
//     id: session.id,
//     paymentIntentId: session.payment_intent,
//     session: session,
//   });
// });

router.post("/", async (req, res) => {
  try {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    const Stripe = stripe(STRIPE_SECRET_KEY);
    const CLIENT_ENDPOINT = process.env.CLIENT_ENDPOINT;

    const { items, email } = req.body;

    // Validate required inputs
    if (!items || items.length === 0 || !email) {
      return res.status(400).json({ error: "Items and email are required" });
    }

    const lineItems = items?.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Ensure integer values
        },
        quantity: item.quantity,
      };
    });

    const session = await Stripe.checkout.sessions.create({
      success_url: `${CLIENT_ENDPOINT}/ordersuccessfull?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_ENDPOINT}/ordercancelled`,
      payment_method_types: ["card"],
      customer_email: email,
      line_items: lineItems,
      mode: "payment",
      payment_intent_data: {
        metadata: {
          customerEmail: email,
        },
      },
    });

    res.json({
      id: session.id,
      paymentIntentId: session.payment_intent,
      session: session,
    });
  } catch (error) {
    console.error("Stripe error details:", error);
    res.status(400).json({
      error: error.message,
      type: error.type,
      code: error.code,
      param: error.param,
    });
  }
});

export default router;
