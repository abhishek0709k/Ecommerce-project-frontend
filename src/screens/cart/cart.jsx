import React, { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to get cart items from the API
  async function getCartItems() {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.get("http://localhost:8000/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setCartItems(response.data.data);
      } else {
        console.log("Error: No data found");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  // Call getCartItems when component mounts
  useEffect(() => {
    getCartItems();
  }, []);

  // Function to remove item from the cart
  const removeFromCart = async (item) => {
    const token = localStorage.getItem("Token");
    try {
      await axios.post(
        "http://localhost:8000/cart/remove-cart",
        { title: item.title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response = await axios.get("http://localhost:8000/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setCartItems(response.data.data);
      } else {
        console.log("Error: No data found");
      }
    } catch (error) {
      console.log("Error removing item", error);
    }
  };

  return (
    <div className="cart-container">
      <Navbar />
      <h1 className="cart-title">🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 😔</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">💲{item.price}</p>
                {/* Ensure rating is accessed correctly */}
                <p className="cart-item-rating">
                  ⭐ {item.rating?.rate ?? "No rating"} / 5
                </p>

                <button
                  onClick={() => removeFromCart(item)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
