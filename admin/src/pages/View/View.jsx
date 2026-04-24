import React, { useEffect, useState } from 'react'
import './View.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const View = ({url, setEditProduct }) => {

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // all products
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`)
      if (response.data.success) {
        setList(response.data.data);
      } 
      else {
      alert("Error...!")
      }
    }

    // update product

    const handleEdit = (item) => {
      setEditProduct(item);
      navigate("/add");
    }
 

    // remove product
    const removeProduct = async(productId) => {
      const response = await axios.post(`${url}/api/product/remove`,{id:productId})
      await fetchList();
      if (response.data.success) {
        alert("Product Deleted Successfully..!");
      }
      else {
        alert("Error..!!")
      }
    }
    useEffect(()=>{
      fetchList()
    },[])

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=> {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{item.category}</p>
              <p onClick={() => handleEdit(item)} className='cursor'>Edit</p>
              <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>      
    </div>
  )
}
export default View
