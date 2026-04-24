import React, { useContext } from "react";
import "./ProductItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, name, price, description, image }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div>
      <div className="product-item">
        <div className="product-item-img-container">
          <img
            className="product-item-image"
            src={url + "/images/" + image}
            alt=""
          />
        </div>
        <div className="product-item-info">
          <div className="product-item-name-rating">
            <p>{name}</p>
          </div>
          <p className="product-item-desc">{description}</p>
          <p className="product-item-price">₹{price}</p>
          {/* {!cartItems?.[id]
              ? <div className='add' onClick={()=>addToCart(id)}>
                  <button>Add to cart</button>
              </div>
              : <div className="counter">
                  <button onClick={() =>removeFromCart(id)}>-</button>
                  <span>{cartItems[id]} Pair</span>
                  <button onClick={() => addToCart(id)}>+</button>
                </div>
            } */}
          <div className="add">
            <button onClick={() => navigate(`/product/${id}`)}>
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
