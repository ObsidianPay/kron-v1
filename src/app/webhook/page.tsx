import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const handleWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, "whsec_85dd77a044460e0e518918eee4d88793319572910c0da504a7b3b02255845283");
    // Handle the event based on its type
    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle successful payment
        break;
      case "payment_intent.failed":
        // Handle failed payment
        break;
      // Add more cases for other event types you want to handle
      default:
        // Handle other event types
        break;
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(400).json({ error: "Webhook handling failed" });
  }
};

export default handleWebhook;