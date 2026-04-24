import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";

const ProductDisplay = ({ category, search }) => {
  const { product_list } = useContext(StoreContext);
  return (
    <div>
      <div className="product-display" id="product-display">
        <h2>Top Products near you</h2>
        <div className="product-display-list">
          {product_list.map((item, index) => {
                const matchCategory = category === "All" || category === item.category;
                const matchSearch = item.name.toLowerCase().includes(search.trim().toLowerCase());

            if (matchCategory && matchSearch) {
              return (
                <ProductItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default ProductDisplay;