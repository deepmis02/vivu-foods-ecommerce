import mongoose from 'mongoose';

// Product kaisa dikhega uska structure (Blueprint)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Emoji ya image URL ke liye
  discount: { type: String },
  weights: [
    {
      label: { type: String, required: true }, // Jaise "1 kg"
      price: { type: Number, required: true }, // Jaise 120
      mrp: { type: Number, required: true }    // Jaise 160
    }
  ]
}, {
  timestamps: true // Ye automatically bata dega ki product kab add hua
});

export default mongoose.model('Product', productSchema);