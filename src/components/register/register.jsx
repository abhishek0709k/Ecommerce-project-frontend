import React, { useState } from 'react';
import './register.css';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/auth/register", { fullname, username, password, email })
      .then((response)=>{
        navigate("/login")
    })
    } catch (error) {
      setEmail("")
      setPassword("")
      setFullname("")
      setUsername("")
      navigate("/register")
    }
  }

  return (
    <div className="register-container">
        <Navbar />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="input-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name" required value={fullname} onChange={(e)=> setFullname(e.target.value)}/>
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" required value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>

        <button type="submit" className="register-btn">Register</button>

        <div className="footer-text">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
