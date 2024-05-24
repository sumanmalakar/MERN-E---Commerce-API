import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
    },
    imgSrc:{
        type:String
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

