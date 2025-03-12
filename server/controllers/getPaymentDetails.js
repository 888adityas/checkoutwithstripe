import express from "express";
import stripe from "stripe";

const router = express.Router();

router.get("/:session_id", async (req, res) => {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const Stripe = stripe(STRIPE_SECRET_KEY);

  try {
    // const session = await Stripe.checkout.sessions.retrieve(
    //   "cs_test_a181tdHEkuuFBBuraRFCtUCmdYxK626PMWMjTSz8zjclgFtaNzlrMvqGVC"
    // );
    const session = await Stripe.checkout.sessions.retrieve(
      req.params.session_id
    );

    // Get payment intent ID

    const paymentIntentId = session.payment_intent;

    // If you need the full payment intent details:
    const paymentIntent = await Stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      paymentId: paymentIntentId,
      paymentDetails: paymentIntent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
