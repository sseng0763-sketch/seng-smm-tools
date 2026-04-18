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
