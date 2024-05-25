import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updaeteProductById,
} from "../Controllers/products.js";
import {Authenticate} from '../Middlewares/auth.js'

const router = express.Router();

// add Products
router.post("/add", addProduct);

// get All Products
router.get("/all", getAllProducts);

// get Product by Id
router.get("/:id", getProductById);

// update product by Id
router.put("/:id", updaeteProductById);

// delete product by Id
router.delete("/:id",Authenticate,deleteProductById)

export default router;
