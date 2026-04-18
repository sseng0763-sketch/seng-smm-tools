function generate() {
  let keyword = document.getElementById("keyword").value;

  let captions = [
    "🔥 ទំនិញថ្មី! " + keyword + " មានលក់ហើយ!",
    "💥 កុំភ្លេច! " + keyword + " កំពុងពេញនិយម!",
    "😍 អ្នកណាខ្លះចូលចិត្ត " + keyword + " ?",
    "🚀 Best Seller: " + keyword
  ];

  let hashtags = [
    "#KhmerShop",
    "#OnlineSale",
    "#Cambodia",
    "#SMM",
    "#Trending"
  ];

  let randomCaption = captions[Math.floor(Math.random() * captions.length)];

  document.getElementById("output").innerHTML =
    "<h3>Caption:</h3>" + randomCaption +
    "<h3>Hashtags:</h3>" + hashtags.join(" ");
}