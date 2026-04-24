import React from 'react'
import './Navbar.css'
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <h2>OSS Collection</h2>
        <img src={assets.profile} className="cart-logo" alt="" />
      </div>
    </div>
  )
}

export default Navbar
