import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const  ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          {data.image_url && data.image_url.length > 0 && (
            <img
              src={data.image_url[0].url}
              alt=""
              className="w-full h-[170px] object-contain"
            />
          )}
        </Link>
        <Link to="/">
          <h5 className={styles.shop_name}>Abhinendra</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={styles.productDiscountPrice}>
                {data.Price === 0 ? data.price : data.discountPrice}$
              </h5>
              <h4 className={styles.price}>
                {data.Price ? data.Price + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => setOpen(!open)}
            color="#444"
            title="Add to cart"
          />
          {
            open ? 
            <ProductDetailsCard setOpen={setOpen} data={data} /> :
            <div></div>
          }
        </div>
      </div>
    </>
  );
};

export default ProductCard;
