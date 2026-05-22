import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'; 
import authRoutes from './routes/authRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js'; // Nayi Order API laya

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB se connection successful ho gaya!'))
  .catch((err) => console.log('❌ MongoDB Error: ', err));

// API Routes ko connect karna
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/orders', orderRoutes); // Order API ko connect kiya

app.get('/', (req, res) => {
  res.send('VIVU Foods ka Backend Server chal raha hai! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server Port ${PORT} par daud raha hai`);
});