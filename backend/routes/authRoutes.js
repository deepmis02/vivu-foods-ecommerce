import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// 1. SIGNUP ROUTE (Naya Account Banana)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check karein ki user pehle se toh nahi hai
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Yeh email pehle se registered hai!" });

    // Password ko secure (Hash) karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user create karein
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Account successfully ban gaya!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. LOGIN ROUTE (Account mein aana)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // User ko email se dhoondhein
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email ya Password galat hai!" });

    // Password check karein
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Email ya Password galat hai!" });

    // Digital ID Card (Token) banayein
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;