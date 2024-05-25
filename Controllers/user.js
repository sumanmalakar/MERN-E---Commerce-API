import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.json({ message: "User Already exist...!",success:false });
    const hashPass = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPass,
      //   password,
    });

    res.json({ message: "User register successfully", user,success:true });
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not exist", success: false });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.json({ message: "Invalid Credentials", success: false });
    const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
      expiresIn: "1d",
    });
    res.json({ message: `Welcome ${user.name}`, token, user, success: true });
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

// all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt :-1});
    if (!users) return res.json({ message: "No user find", users, success: false });
    res.json({ message: "All users ", users });
  } catch (error) {
    res.json({ messge: error, success: false });
  }
};

// get User by Id
export const userById = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id);
    if (!user) return res.json({ message: "User not exist" });
    res.json({ user });
  } catch (error) {
    res.json({ message: error });
  }
};

// user Profile
export const profile = (req,res)=>{
  res.json({message:'User Profile', user:req.user})
}