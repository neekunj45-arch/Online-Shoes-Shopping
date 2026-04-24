import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    
    <div className="navbar">
      <Link to="/">
        <h2>OSS Collection</h2>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-item"
          onClick={() => setMenu("products")}
          className={menu === "products" ? "active" : ""}
        >
          Sneakers
        </a>
        <a
          href="#explore-item"
          onClick={() => setMenu("new")}
          className={menu === "new" ? "active" : ""}
        >
          New
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.cart} className="cart-logo" alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Log in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile} className="cart-logo" alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag} alt="" /><p>Orders</p> </li>
              <hr />
              <li onClick={logout}><img src={assets.exit} alt="" /><p>Log out</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;