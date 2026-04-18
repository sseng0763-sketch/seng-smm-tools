require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_KEY);

// 🤖 AI endpoint
app.post("/ai", async (req, res) => {
  const { keyword } = req.body;

  const text = `🔥 ${keyword} មានលក់ហើយ! ទិញឥឡូវនេះ!`;

  res.json({ text });
});

// 💳 Payment
app.post("/create-checkout-session", async (req, res) => {
  const { plan } = req.body;

  const priceMap = {
    pro: process.env.PRICE_PRO,
    vip: process.env.PRICE_VIP
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceMap[plan], quantity: 1 }],
    success_url: "https://your-site.github.io/?success=true",
    cancel_url: "https://your-site.github.io/"
  });

  res.json({ url: session.url });
});

// 🔐 Webhook
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment success:", session.customer_details.email);

    // 👉 update DB here
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
