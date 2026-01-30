import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f7f7f7", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🛒 WebMart Store
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {products.map((p) => (
          <div key={p._id} style={{
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "0.3s"
          }}>
            <img 
              src={p.image} 
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px" }} 
            />

            <h3 style={{ marginTop: "10px" }}>{p.title}</h3>
            <p style={{ color: "#6c5ce7", fontWeight: "bold" }}>
              ₹{p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
