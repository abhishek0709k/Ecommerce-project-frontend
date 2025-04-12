import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  useEffect(() => {
    if(searchQuery !== "" && searchQuery.length > 0){
      handleSearch()
    }else {
      async function data() {
        const response = await fetch("https://fakestoreapi.com/products");
        const productData = await response.json();
        setCardData(productData);
      }
      data();
    }
  }, [searchQuery]);

  const handleOnClickAddCart = async (card) => {
    const token = localStorage.getItem("Token");
    await axios
      .post(
        "http://localhost:8000/cart/add-cart",
        {
          image: card.image,
          title: card.title,
          description: card.description,
          category: card.category,
          rating: card.rating,
          price: card.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Cart", response);
        navigate("/cart");
      });
  };

  const handleSearch = ()=>{
    const data = cardData.filter((item)=> item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setCardData(data)
  }
  
  return (
    <div className="home-container">
      <Navbar setSearchQuery={setSearchQuery}/>
      <h1 className="home-title">Welcome to Home Page</h1>

      <div className="card-grid">
        {Array.isArray(cardData) &&
          cardData.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} className="card-image" />
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
              <button
                className="card-button"
                onClick={() => handleOnClickAddCart(card)}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
