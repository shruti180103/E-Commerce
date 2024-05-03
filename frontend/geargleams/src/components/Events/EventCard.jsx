import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({active}) => {

  return (
    <div
      className={`w-full block bg-white rounded-lg ${active ? "unset":"mb-12"} lg:flex p-2 mb-12`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/71F5LgB94+S._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Drill Driver</h2>
        <p>
          Abhinendra
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              200$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              300$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
             120 sold
          </span>
        </div>
        <CountDown/>
        <br />
      </div>
    </div>
  );
};

export default EventCard;
