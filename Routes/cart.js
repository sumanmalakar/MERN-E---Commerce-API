import express from "express";
import {
  addItemToCart,
  clearCart,
  decreaseItemQty,
  getUserCart,
  removeItemFromCart,
} from "../Controllers/cart.js";
import { Authenticate } from "../Middlewares/auth.js";

const router = express.Router();

// add to cart
router.post("/add",Authenticate, addItemToCart);

// user cart
router.get("/usercart", Authenticate, getUserCart);

// remove item from cart
router.delete("/remove/:productId", Authenticate, removeItemFromCart);

// decrease qty in cart
router.post("/decreaseqty", Authenticate, decreaseItemQty);

//clear cart
router.delete("/clear",Authenticate,clearCart);

export default router;
