import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// 1. SEED ROUTE: Database mein ek sath products daalne ke liye
router.get('/seed', async (req, res) => {
  try {
    const productsToInsert = [
      {
        name: "Premium Shuddh Chakki Atta", icon: "🌾", discount: "15%",
        weights: [{ label: "5 kg", price: 245, mrp: 290 }, { label: "10 kg", price: 470, mrp: 550 }]
      },
      {
        name: "Lal Mirch Powder (Stone Ground)", icon: "🌶️", discount: "10%",
        weights: [{ label: "200 g", price: 85, mrp: 95 }, { label: "500 g", price: 200, mrp: 220 }]
      },
      {
        name: "Organic Arhar/Tuvaar Dal", icon: "🥣", discount: "20%",
        weights: [{ label: "1 kg", price: 160, mrp: 195 }, { label: "2 kg", price: 310, mrp: 380 }]
      },
      {
        name: "Handpicked Basmati Rice", icon: "🍚", discount: "25%",
        weights: [{ label: "1 kg", price: 120, mrp: 160 }, { label: "5 kg", price: 550, mrp: 750 }]
      }
    ];

    // Pehle ka kachra saaf karein aur naye products daalein
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(productsToInsert);
    
    res.json({ message: "Products successfully added to MongoDB!", data: createdProducts });
  } catch (error) {
    res.status(500).json({ error: "Products add karne mein error aayi" });
  }
});

// 2. GET ROUTE: Database se saare products lane ke liye (Frontend yahi use karega)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;