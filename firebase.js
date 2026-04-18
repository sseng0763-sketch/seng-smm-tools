let user = {
  plan: "free", // change to pro/vip when paid
  used: 0
};

// 🔒 Limit system
function canUse() {
  if (user.plan === "free" && user.used >= 5) {
    alert("Upgrade to Pro to continue 🚀");
    return false;
  }
  return true;
}

// 🤖 Generate Caption (call backend)
async function generate() {
  if (!canUse()) return;

  let keyword = document.getElementById("keyword").value;

  const res = await fetch("https://your-server.com/ai", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ keyword })
  });

  const data = await res.json();

  document.getElementById("output").innerText = data.text;

  user.used++;
}

// 💳 Payment (Stripe)
async function buy(plan) {
  const res = await fetch("https://your-server.com/create-checkout-session", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ plan })
  });

  const data = await res.json();
  window.location.href = data.url;
}
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_KEY);

// 💳 Create Checkout
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

// 🤖 AI Endpoint
app.post("/ai", async (req, res) => {
  const { keyword } = req.body;

  // simple AI logic (replace with OpenAI later)
  const text = `🔥 ${keyword} មានលក់ហើយ! ទិញឥឡូវនេះ!`;

  res.json({ text });
});

app.listen(3000, () => console.log("Server running"));
