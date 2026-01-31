import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      <div className="p-3" style={{ height: '200px', textAlign: 'center' }}>
        <img 
          src={product.image} 
          className="card-img-top h-100" 
          alt={product.title} 
          style={{ objectFit: 'contain' }} 
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title text-dark fw-bold text-truncate">{product.title}</h6>
        <div className="text-warning mb-2 small">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
          <span className="text-muted ms-1">({product.rating?.count || 0})</span>
        </div>
        <h5 className="text-dark fw-bold mb-3">₹{product.price.toLocaleString()}</h5>
        <button 
          className="btn btn-warning w-100 mt-auto fw-bold"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}