import React, { useEffect, useState } from "react";
import "./navbar.css";
import axios from "axios";
import { Link } from "react-router";

const Navbar = ({ setSearchQuery }) => {
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [query, setQuery] = useState("")
  useEffect(() => {
    try {
        async function getCount() {
            const response = await axios.get("http://localhost:8000/cart/cart-count", {
                headers: {Authorization: `Bearer ${token}`},
              })
              setCartCount(response.data.data.count)
          }
          getCount();
    } catch (error) {
        console.log(error)
    }
  }, [token]);
  const handleOnclick = (e)=>{
    setSearchQuery(query);
    setQuery("")
  }
  const handleLogout = () => {
    localStorage.removeItem("Token");
    setToken(null);
  };
  return (
    <nav className="navbar">
      {/* Left Side */}
      <div className="navbar-left">
        <Link to={"/"}>Home</Link>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <div className="search-bar">
          <input type="text" placeholder="Search..." value={query} 
            onChange={(e) => {
              setQuery(e.target.value);
            }} 
          />
          <button onClick={handleOnclick}>Search</button>
        </div>
      </div>

      {/* Right Side */}
      {token?.length > 0 && (
        <div className="login-link">
          <div className="navbar-right">
            <Link to={"/login"} onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      )}

      {(!token || token?.length === 0) && (
        <div className="login-link">
          <div className="navbar-right">
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}

      <div className="cart">
        <Link to="/cart">
          🛒
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
