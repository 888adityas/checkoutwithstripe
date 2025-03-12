import Order from "../models/orderModel.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { items, email } = req.body;

  const orderItems = items.map((item) => {
    return {
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    };
  });
  const total_price = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = new Order({
    customerEmail: email,
    items: orderItems,
    paymentStatus: "pending",
    transactionId: null,
    totalPrice: Number(total_price),
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json({ data: createdOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update order payment status and transaction id
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const { paymentStatus, transactionId } = req.body;

  try {
    const order = await Order.findById(id);
    if (order) {
      order.paymentStatus = paymentStatus;
      order.transactionId = transactionId;
      const updatedOrder = await order.save();
      res.status(201).json({ data: updatedOrder });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
