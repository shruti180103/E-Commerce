import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Correct import
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";

const Cart = ({ setOpenCart }) => {
  const [value, setValue] = useState(1);

  const cartData = [
    {
      name: "Tire ",
      description: "Car",
      Price: "1500",
    },
    {
      name: "Light",
      description: "front light",
      Price: "2000",
    },
    {
      name: "Engine ",
      description: "Car",
      Price: "15000",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <AiOutlineClose // Correct icon component
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
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
        <AiOutlineClose className="cursor-pointer"/> {/* Correct icon component */}
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ftire&psig=AOvVaw3Jk_vFojMYybDQ1drlxte6&ust=1714861725706000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCBhPLD8oUDFQAAAAAdAAAAABAE"
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

export default Cart;
