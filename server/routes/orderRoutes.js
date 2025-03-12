import express from "express";
import { createOrder, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder);
router.patch("/:id", updateOrder);

export default router;
