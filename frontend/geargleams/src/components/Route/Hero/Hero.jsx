import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import backgroundImage from './bgImg.jpg'; // Adjust the path accordingly


const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${backgroundImage})`,
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[600] capitalize`}
        >
          Best Collection for <br /> Automotive Parts
        </h1>
        <p
          className="pt-5 pb-3 text-[16px] font-[Poppins] font-[400] text-[#ffffff]"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Example: Semi-transparent black background
            paddingTop: "20px", // Add vertical padding (adjust the value as needed)
            paddingBottom: "20px", // Add vertical padding (adjust the value as needed)
          }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>

        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
