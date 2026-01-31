import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${query}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">WebMart</Link>
        <form className="d-flex w-50 mx-auto" onSubmit={handleSearch}>
          <input className="form-control me-2" type="search" placeholder="Search..." onChange={(e)=>setQuery(e.target.value)} />
          <button className="btn btn-warning" type="submit">Search</button>
        </form>
        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link text-white" to="/login">Login</Link>
          <Link className="btn btn-outline-warning position-relative" to="/cart">
            🛒 Cart <span className="badge bg-danger ms-1">{cart.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}