import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Premium Bestseller Badge */}
      <div className="card-badge">BESTSELLER</div>
      
      {/* Product Image */}
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      
      <div className="product-info">
        {/* Trust Badges Row (Zoff Inspired) */}
        <div className="trust-row">
          <span className="trust-item">🌱 100% Pure</span>
          <span className="trust-item">🔬 Lab Tested</span>
        </div>
        
        {/* Product Title */}
        <h3 className="product-title">{product.name}</h3>
        
        {/* Star Rating Social Proof */}
        <div className="rating-row">
          <span className="stars">★★★★★</span>
          <span className="rating-count">4.8 (124 reviews)</span>
        </div>
        
        {/* Pricing Strategy (Discount look) */}
        <div className="price-row">
          <span className="price">₹{product.price}</span>
          <span className="mrp">₹{product.price + 40}</span>
          <span className="discount-tag">Save ₹40</span>
        </div>
        
        {/* Premium Call to Action Button */}
        <button className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;