import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      
    },
    addressLine: {
      type: String,
      required: true,
      
    },
    city: {
      type: String,
      required: true,
      
    },
    state: {
      type: String,
      required: true,
      
    },
    pinCode: {
      type: String,
      required: true,
      
    },
    country: {
      type: String,
      required: true,
      
    },
    phoneNumber: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);


