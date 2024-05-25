import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
// import crypto from "crypto";
import { createHmac } from "crypto";

// Load environment variables
import dotenv, { config } from "dotenv";
dotenv.config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const placeOrder = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  // console.log(amount, cartItems, userShipping);
  try {
    const order = await razorpay.orders.create(options);
    // console.log("order = ",order)
    res.json({
      orderId: order.id,
      amount: amount,
      // amount: order.amount,
      cartItems,
      userId,
      userShipping,
      payStatus: "created",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOrder = async (req, res) => {
  // console.log(req.body);
  let {
    signature,
    paymentId,
    orderId,
    userShipping,
    userId,
    orderItems,
    amount,
  } = req.body;
  const generatedSignature = createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  )
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  // console.log("gerate signature", generatedSignature);
  // console.log("original", signature);

  try {
    // const payment = new Payment(req.body);
    if (generatedSignature == signature) {
      // payment is successful
      console.log("varifed signature", generatedSignature);
      const payment = new Payment({
        payStatus: "paid",
        signature,
        paymentId,
        orderId,
        userShipping,
        userId,
        orderItems,
        amount,
      });
      await payment.save();
      res.json({ message: "Payment successful", payment });
      // console.log()
    } else {
      res.json({ messge: "varify failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userOrders = async (req, res) => {
  let userId = req.user._id.toString();
  // let userId = "664b4f29a3089d465f55666e";
  console.log(userId);

  try {
    let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });

    if (!orders) return res.json({ message: "Not order yet" });

    res.json({ message: "User Ordered Products ", orders });
  } catch (error) {
    res.json({ messge: error });
  }
};

export const AllOrders = async (req, res) => {
  try {
    let orders = await Payment.find().sort({ orderDate: -1 });

    if (!orders) return res.json({ message: "Not order yet" });

    res.json({ message: "All Ordered Products ", orders });
  } catch (error) {
    res.json({ messge: error });
  }
};
