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
