import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './screens/home/home'
import Login from './components/login/login'
import Register from './components/register/register'
import Cart from './screens/cart/cart'
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