import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithPopup, addDoc, collection };
import { db, addDoc, collection } from "./firebase.js";

function generateAI(keyword) {
  let captions = [
    `🔥 Hot Deal: ${keyword} limited time!`,
    `💥 Must have ${keyword} now available!`,
    `😍 Everyone loves ${keyword}!`,
    `🚀 Best choice for ${keyword}`
  ];

  return captions[Math.floor(Math.random() * captions.length)];
}

async function savePost(text) {
  await addDoc(collection(db, "posts"), {
    text: text,
    time: Date.now()
  });
}
import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function savePost(text) {
  await addDoc(collection(db, "posts"), {
    text,
    time: Date.now()
  });
}
export async function sendTelegram(text) {
  let token = "YOUR_BOT_TOKEN";
  let chat_id = "YOUR_CHAT_ID";

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat_id,
      text: text
    })
  });
}
import { generateAI } from "./ai.js";
import { savePost } from "./firebase.js";
import { sendTelegram } from "./app.js";

async function generate() {
  let keyword = document.getElementById("keyword").value;

  let caption = await generateAI(keyword);

  document.getElementById("output").innerText = caption;

  await savePost(caption);

  await sendTelegram(caption);
}
import { auth, GoogleAuthProvider, signInWithPopup } from "./firebase.js";

function login() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(user => {
      console.log(user.user.displayName);
    });
}
import { db, addDoc, collection } from "./firebase.js";

export async function setUserPlan(userId, plan) {
  await addDoc(collection(db, "users"), {
    userId: userId,
    plan: plan, // free | pro | vip
    expire: Date.now() + 30 * 24 * 60 * 60 * 1000
  });
}
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadStats() {
  let snap = await getDocs(collection(db, "posts"));

  let total = 0;

  snap.forEach(doc => total++);

  document.getElementById("stats").innerHTML = `
    <h3>Total Posts: ${total}</h3>
  `;
}

loadStats();
export async function autoPostFacebook(text, token) {
  await fetch(`https://graph.facebook.com/me/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: text,
      access_token: token
    })
  });
}
export async function sendTelegram(text) {
  let token = "BOT_TOKEN";
  let chat_id = "CHAT_ID";

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id,
      text
    })
  });
}
export function checkLimit(userPlan, count) {
  if (userPlan === "free" && count > 5) {
    alert("Upgrade to Pro!");
    return false;
  }
  return 
export const PLANS = {
  free: { limit: 5 },
  pro: { price: 5, limit: 100 },
  vip: { price: 10, limit: -1 }
};
  export async function checkout(plan) {
  const res = await fetch("/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan })
  });

  const data = await res.json();
  window.location.href = data.url;
}
  export async function aiEngine(keyword, tone = "marketing") {
  return `🔥 ${keyword} - Best deal today! Limited offer!`;

  // upgrade later → connect OpenAI / Gemini API
}
export async function contentFactory(keywords) {
  let posts = [];

  for (let k of keywords) {
    posts.push(await aiEngine(k));
  }

  return posts;
}
export async function autoPostAll(platforms, text) {
  for (let p of platforms) {
    if (p === "telegram") sendTelegram(text);
    if (p === "facebook") sendFacebook(text);
    if (p === "web") console.log(text);
  }
}
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function login() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(user => {
      console.log("Logged in:", user.user.displayName);
    })
    .catch(err => console.log(err));
}
  export async function generateAI(keyword) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create Khmer marketing caption for ${keyword}`
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
  import { getFirestore, addDoc, collection } from "firebase/firestore";

export async function savePost(db, text, userId) {
  await addDoc(collection(db, "posts"), {
    userId,
    text,
    createdAt: Date.now()
  });
}
import { getDocs, collection } from "firebase/firestore";

export async function loadDashboard(db) {
  const snap = await getDocs(collection(db, "posts"));

  let total = 0;

  snap.forEach(() => total++);

  document.getElementById("stats").innerHTML =
    `🔥 Total Posts: ${total}`;
}
export async function sendTelegram(text) {
  const token = "BOT_TOKEN";
  const chatId = "CHAT_ID";

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  });
}
