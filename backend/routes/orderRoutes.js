import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// 1. Naya order database mein save karne ki API (Pehle se thi)
router.post('/', async (req, res) => {
  try {
    const { userId, orderItems, shippingAddress, totalAmount } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Cart khali hai!" });
    }

    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json({ message: "Order Successfully Save Ho Gaya!", order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: "Order save karne mein error", error: error.message });
  }
});

// 2. User ke purane orders laane ki API (Nayi API)
router.get('/user/:userId', async (req, res) => {
  try {
    // Database se user ke orders dhoondho aur naye orders sabse upar dikhao (sort -1)
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Orders laane mein error", error: error.message });
  }
});

export default router;