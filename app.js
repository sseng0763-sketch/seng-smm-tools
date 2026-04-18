let user = {
  email: "test@gmail.com",
  plan: "free",
  used: 0
};

// 🔒 Limit
function canUse() {
  if (user.plan === "free" && user.used >= 5) {
    alert("Upgrade to Pro 🚀");
    return false;
  }
  return true;
}

// 🤖 AI
async function generate() {
  if (!canUse()) return;

  let keyword = document.getElementById("keyword").value;

  const res = await fetch("https://seng_smm.com/ai", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ keyword })
  });

  const data = await res.json();

  document.getElementById("output").innerText = data.text;

  user.used++;
}

// 💳 Payment
async function buy(plan) {
  const res = await fetch("https://seng_smm.com/create-checkout-session", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ plan })
  });

  const data = await res.json();
  window.location.href = data.url;
}
