import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <p>Add Products</p>
        </NavLink>
        <NavLink to="/view" className="sidebar-option">
          <p>List Products</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <p>orders</p>
        </NavLink>
      </div>
      <div className="logout">
        <p onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
