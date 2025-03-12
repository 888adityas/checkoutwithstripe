import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerEmail: {
      type: String,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    transactionId: {
      type: String,
      default: null,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
