import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes.js";

import checkoutController from "./controllers/checkoutController.js";
import getPaymentDetails from "./controllers/getPaymentDetails.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/order", orderRoutes);
app.use("/api/create-checkout-session", checkoutController);

app.use("/api/payment-details", getPaymentDetails);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
