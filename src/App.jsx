import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './screens/home/home.jsx'
import Login from './components/login/login.jsx'
import Register from './components/register/register.jsx'
import Cart from './screens/cart/cart.jsx'
function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default App