import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { product_list, addToCart, cartItems, removeFromCart, url } =
    useContext(StoreContext);

  const product = product_list.find((item) => item._id === id);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading product...</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={url + "/images/" + product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-desc">{product.description}</p>
        <div className="product-price">₹{product.price}</div>
        {!cartItems?.[id] ? (
          <div className="add" onClick={() => addToCart(id)}>
            <button>Add to cart</button>
          </div>
        ) : (
          <div className="counter">
            <button onClick={() => removeFromCart(id)}>-</button>
            <span>{cartItems[id]} pair</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;