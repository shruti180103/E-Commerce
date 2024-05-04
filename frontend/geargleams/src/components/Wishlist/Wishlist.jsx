import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri"; // Changed import statement
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const [value, setValue] = useState(1);

  const cartData = [
    {
      name: "Tire ",
      description: "Car",
      Price: 1500, // Changed Price value to number
    },
    {
      name: "Light",
      description: "front light",
      Price: 2000, // Changed Price value to number
    },
    {
      name: "Engine ",
      description: "Car",
      Price: 15000, // Changed Price value to number
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RiCloseLine // Changed component to RiCloseLine
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((data, index) => (
                <CartSingle key={index} data={data} value={value} setValue={setValue} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, value, setValue }) => {
  const totalPrice = data.Price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RiCloseLine className="cursor-pointer" /> {/* Changed component to RiCloseLine */}
        <img
          src="https://via.placeholder.com/80" // Changed src to a placeholder image URL
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Wishlist;
