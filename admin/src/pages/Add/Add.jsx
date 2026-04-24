import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Add = ({ url, editProduct, setEditProduct }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(assets.image_upload);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);

  // Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setData({
      name: "",
      price: "",
      category: "Men",
      description: "",
    });
    setImage(null);
    setImagePreview(assets.image_upload);
    setIsEdit(false);
    setProductId(null);
    setEditProduct(null);
  };

  // Load edit product data
  useEffect(() => {
    if (editProduct) {
      setData({
        name: editProduct.name,
        price: editProduct.price,
        category: editProduct.category,
        description: editProduct.description,
      });

      setIsEdit(true);
      setProductId(editProduct._id);

      // Show existing image
      setImagePreview(`${url}/images/${editProduct.image}`);
    }
  }, [editProduct, url]);

  // Submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("description", data.description);

      if (image) {
        formData.append("image", image);
      }

      let response;

      if (isEdit) {
        formData.append("id", productId);
        response = await axios.post(`${url}/api/product/update`, formData);
      } else {
        response = await axios.post(`${url}/api/product/add`, formData);
      }

      if (response.data.success) {
        alert(
          isEdit
            ? "Product Updated Successfully!"
            : "Product Added Successfully!"
        );

        resetForm();
      } else {
        alert("Something went wrong...!!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error...!!");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : imagePreview}
              alt="preview"
            />
          </label>

          <input
            type="file"
            id="image"
            hidden
            required={!isEdit}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Product name"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="6"
            placeholder="Description"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="Price"
              min="1"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;

// import React, { useEffect, useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets';
// import axios from "axios"

// const Add = ({ url, editProduct, setEditProduct }) => {

//   const [image, setImage] = useState(null);
//   const [imagePreview , setImagePreview ] = useState(assets.image_upload)
//   const [data,setData] = useState({
//     name:"",
//     description:"",
//     price:"",
//     category: "Men",
//   });

//   const [isEdit , setIsEdit] = useState(false);
//   const [productId, setProductId] = useState(null);

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }));
//   }

//   useEffect(() => {
//     if(editProduct) {
//       setData({
//         name: editProduct.name,
//         price: editProduct.price,
//         category: editProduct.category,
//         description: editProduct.description,
//       });
//       setIsEdit(true);
//       setProductId(editProduct._id);

//       //image preview
//       setImagePreview(`${url}/images/${editProduct.image}`)
//     }
//   }, [editProduct]);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);
//     formData.append("description", data.description)

//     if (image) {
//       formData.append("image", image);
//     }

//     let response;

//     if(isEdit) {
//       formData.append("id", productId);
//       response = await axios.post(`${url}/api/product/update`, formData);
//     } else {
//       response = await axios.post(`${url}/api/product/add`, formData);
//     }

//     if(response.data.success) {
//       alert(isEdit ? "Product Updated Successfully!" : "Product Added Successfully!");

//       setData({ name: "", price: "", category: "Men", description: "" });
//       setImage(null);
//       setIsEdit(false);
//       setEditProduct(null);
//     } else {
//       alert("Something went wrong...!!");
//     }
//   }

//   return (

//     <div className='add'>
//       <form className='flex-col' onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img src={image ? URL.createObjectURL(image) : imagePreview} alt="" />
//           </label>
//           <input onChange={(e) => {
//     setImage(e.target.files[0]);
//     setImagePreview(URL.createObjectURL(e.target.files[0])); // new
//   }}  type="file" id='image' hidden required={!isEdit} />
//         </div>
//         <div className="add-product-name flex-col">
//           <p>Product name</p>
//           <input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Product name'/>
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product description</p>
//           <textarea name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder='Description' required></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product Category</p>
//             <select onChange={onChangeHandler} name="category" value={data.category}>
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//             <p>Product price</p>
//             <input type="number" onChange={onChangeHandler} value={data.price} name='price' placeholder='price' min="0"/>
//           </div>
//         </div>
//         <button type='submit' className='add-btn'>
//           {isEdit ? "Update Product" : "Add Product"}
//         </button>
//       </form>

//     </div>
//   )
// }

// export default Add

// import React, { useEffect, useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets';
// import axios from "axios"
// const Add = ({url}) => {

//   const [image, setImage] = useState(false);
//   const [data,setData] = useState({
//     name:"",
//     description:"",
//     price:"",
//     category: "Mobile",
//   });

//   const [isEdit , setIsEdit] = useState(false);
//   const [productId, setProductId] = useState(null);

//   const onChangeHandler = (event) => {
//       const name = event.target.name;
//       const value = event.target.value;
//       setData(data=>({...data,[name]:value}))
//   }

//   const onSubmitHandler = async (event) => {
//       event.preventDefault();
//       const formData = new FormData();
//       formData.append("name",data.name);
//       formData.append("description",data.description);
//       formData.append("price",Number(data.price));
//       formData.append("category",data.category);
//       formData.append("image",image);
//       const response = await axios.post(`${url}/api/product/add`,formData);

//       if (response.data.success) {
//         setData({
//           name:"",
//           description:"",
//           price:"",
//           category: "Mobile",
//         })
//         setImage(false);

//         alert("product added successfully...!");
//       }
//       else {
//         alert("something went wrong...!!");
//       }
//   }

//   useEffect(() => {
//     if(editProduct) {
//       setData({
//         name: editProduct.name,
//         price: editProduct.price,
//         category: editProduct.category
//       });
//       setIsEdit(true);
//       setProductId(editProduct._id);
//     }
//   },[editProduct]);

//   return (

//     <div className='add'>
//       <form className='flex-col' onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img src={image?URL.createObjectURL(image):assets.image_upload} alt="" />
//           </label>
//           <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
//         </div>
//         <div className="add-product-name flex-col">
//           <p>Product name</p>
//           <input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Product name'/>
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product description</p>
//           <textarea name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder='Description' required></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product Category</p>
//             <select onChange={onChangeHandler} name="category">
//               <option value="Mobile">Mobile</option>
//               <option value="TV">TV</option>
//               <option value="Fridge">Fridge</option>
//               <option value="Washing-machine">Washing machine</option>
//               <option value="Laptop">Laptop</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//             <p>Product price</p>
//             <input type="number" onChange={onChangeHandler} value={data.price} name='price' placeholder='price'/>
//           </div>
//         </div>
//         <button type='submit' className='add-btn'>Add product</button>
//       </form>

//     </div>
//   )
// }

// export default Add
