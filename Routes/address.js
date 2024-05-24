import express from "express";
import { addAddress, getAddressesByUserId } from "../Controllers/address.js";
import { Authenticate } from "../Middlewares/auth.js";

const router = express.Router();

// add address
router.post("/add", Authenticate, addAddress);

// get address
router.get("/",Authenticate, getAddressesByUserId);

export default router;
