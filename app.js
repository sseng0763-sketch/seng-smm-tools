function generate() {
  let keyword = document.getElementById("keyword").value;

  if (!keyword) {
    alert("សូមបញ្ចូល keyword!");
    return;
  }

  let captions = [
    "🔥 ទំនិញថ្មី " + keyword + " មានលក់ហើយ!",
    "💥 កុំភ្លេច " + keyword + " កំពុង Hot!",
    "😍 អ្នកណាចូលចិត្ត " + keyword + " ?",
    "🚀 Best Deal: " + keyword
  ];

  let hashtags = [
    "#Khmer",
    "#SMM",
    "#OnlineShop",
    "#Cambodia",
    "#" + keyword.replace(/\s/g, "")
  ];

  let text = captions[Math.floor(Math.random() * captions.length)];

  document.getElementById("output").innerHTML =
    "<h3>Caption:</h3><p id='text'>" + text + "</p>" +
    "<h3>Hashtags:</h3><p>" + hashtags.join(" ") + "</p>";
}

function copyText() {
  let text = document.getElementById("text").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}
