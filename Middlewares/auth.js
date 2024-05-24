import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const Authenticate = async (req, res, next) => {
  const token = req.header("Auth");
  try {
    if (!token) return res.json({ message: "login first" });

    const decode = jwt.verify(token, "!@#$%^&*()");
 
    // console.log("this is decoded data ",decode)

    const id = decode.userId;

    let user = await User.findById(id);

    if (!user) return res.json({ message: "User not exist" });

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name == "JsonWebTokenError" ||
      error.message == "invalid signature"
    )
      return res.json({ message: "Login as User, Invalid Token" });
    res.json({ message: error });
  }
};
