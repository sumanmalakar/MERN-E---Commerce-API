import { Product } from "../Models/Products.js";

// add Product
export const addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.json({ message: "Product Added Successfully..!", product });
  } catch (error) {
    res.json({ message: error });
  }
};

// get All Products
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    if (!products) res.json({ message: "No Product find", products });
    res.json({ message: "All Products", products });
  } catch (error) {
    res.json({ message: error });
  }
};

// get product by Id
export const getProductById = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product) return res.json({ message: "Invalid Id" });
    res.json({ message: "Product by Id", product });
  } catch (error) {
    res.json({ message: error });
  }
};

// update product by Id
export const updaeteProductById = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.json({ message: "Invalid Id" });
    res.json({ message: "Product Updated Successfully", product });
  } catch (error) {
    res.json({ message: error });
  }
};

// delete product by Id
export const deleteProductById = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(id);
    if (!product) return res.json({ message: "Invalid Id" });
    res.json({ message: "Product Deleted Successfully", product });
  } catch (error) {
    res.json({ message: error });
  }
};
