import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // Kis user ne order kiya
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Kya-kya saman mangwaya
  orderItems: [
    {
      productName: { type: String, required: true },
      weightLabel: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  
  // Kahan bhejna hai aur kitne paise hue
  shippingAddress: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  
  // Order ka status
  paymentMethod: { type: String, default: 'Cash On Delivery' },
  status: { type: String, default: 'Pending' } // Pending, Shipped, Delivered
}, {
  timestamps: true // Order kis time aur date par aaya
});

export default mongoose.model('Order', orderSchema);