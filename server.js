const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/smm-panel");

app.use("/api/auth", require("./routes/auth"));
app.use("/api/order", require("./routes/order"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  balance: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  service: String,
  link: String,
  quantity: Number,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashed
  });
  await user.save();
  res.json("User created");
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json("Wrong password");

  const token = jwt.sign({ id: user._id }, "SECRET_KEY");
  res.json({ token });
});

module.exports = router;
const router = require("express").Router();
const Order = require("../models/Order");

// create order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// get orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
npm init -y
npm install express mongoose cors bcrypt
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/smm_panel");

// user schema
const User = mongoose.model("User", {
  email: String,
  password: String
});


// REGISTER
app.post("/register", async (req,res)=>{
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: hashed
  });

  await user.save();
  res.json({message:"Registered"});
});


// LOGIN
app.post("/login", async (req,res)=>{
  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return res.json({message:"User not found"});
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if(!match){
    return res.json({message:"Wrong password"});
  }

  res.json({message:"Login success"});
});


app.listen(5000, ()=>{
  console.log("Server running...");
});
npm install axios
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// SMM API config
const API_URL = "https://provider.com/api/v2";
const API_KEY = "YOUR_API_KEY";

// CREATE ORDER
app.post("/order", async (req,res)=>{
  const {service, link, quantity} = req.body;

  try{
    const response = await axios.post(API_URL, {
      key: API_KEY,
      action: "add",
      service: service,
      link: link,
      quantity: quantity
    });

    res.json(response.data);

  } catch(err){
    res.json({error:"API failed"});
  }
});

app.listen(5000, ()=>{
  console.log("Server running...");
});
node server.js