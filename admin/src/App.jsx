import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import View from './pages/View/View'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'

const App = () => {

  const url = "http://localhost:4000"

  const [editProduct, setEditProduct] = useState(null);

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Login />;
  }
  
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} editProduct={editProduct} setEditProduct={setEditProduct} />}/>
          <Route path="/view" element={<View url={url} setEditProduct={setEditProduct}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
