import express from "express";
import {  AllOrders, placeOrder, userOrders, verifyOrder } from "../Controllers/payment.js";
import { Authenticate } from "../Middlewares/auth.js";

const router = express.Router();

// create order
router.post("/placeorder",  placeOrder);

// varify payment
router.post("/verify-payment", verifyOrder);

// user orders
router.get('/orders',Authenticate,userOrders)

// All Users (Admin)
router.get('/allorders',AllOrders)




export default router;
