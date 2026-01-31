import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation(); // To capture the ?q= query from the Navbar

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // This hits your backend: http://localhost:5000/api/products?q=...
        const res = await axios.get(`http://localhost:5000/api/products${search}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [search]); // Re-run when the search query in the URL changes

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Banner - Amazon Style */}
      <div className="container-fluid p-0 mb-4">
        <div className="bg-dark text-white text-center py-5" style={{ background: 'linear-gradient(to bottom, #232f3e, #37475a)' }}>
          <h1 className="display-4 fw-bold">Welcome to WebMart</h1>
          <p className="lead">Experience the best deals on electronics, fashion, and more.</p>
        </div>
      </div>

      <div className="container">
        <h3 className="mb-4 fw-bold text-secondary">
          {search ? `Search results for "${search.split('=')[1]}"` : "Recommended for You"}
        </h3>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="mt-2">Loading products...</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="text-center my-5">
                <h4>No products found. Try a different search!</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}