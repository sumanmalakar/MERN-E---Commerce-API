import express from "express";
import {
  login,
  register,
  getAllUsers,
  userById,
  profile,
} from "../Controllers/user.js";

import { Authenticate } from "../Middlewares/auth.js";

const router = express.Router();

// user register
router.post("/register", register); // '/api/user'

// user login
router.post("/login", login);

// get All users
router.get("/all", getAllUsers);

// user profile
router.get("/profile", Authenticate, profile);


// get User by Id
router.get("/:id", userById);


export default router;
