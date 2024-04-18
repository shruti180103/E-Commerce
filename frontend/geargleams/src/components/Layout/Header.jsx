import React, { useState } from "react";
import { Link } from "react-router-dom";
import { productData } from "../../static/data";
import { categoriesData } from "../../static/data";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";

import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import styles from "./Header"; // Import your CSS module

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div className={`${styles.header} ${styles.searchContainer}`}>
      {/* Become Seller Button */}
      <div className={styles.button}>
        <Link to="/seller" className={styles.sellerLink}>
          <h1 className={`${styles.sellerText} text-black flex items-center`}>
            <IoIosArrowForward className={`${styles.arrowIcon} ml-1`} />
          </h1>
        </Link>
      </div>

      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="D:\capstone ecommerce\ecommerce\E-Commerce\frontend\geargleams\src\static\image-removebg-preview (1).png"
            alt=""
          />
        </Link>
      </div>

      {/* Search Box */}

      <div
        className={`${styles.searchContainer} w-[50%] relative`}
        style={{ margin: "0 auto" }}
      >
        <input
          type="text"
          placeholder="Search Product..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`${styles.searchInput} h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md`}
        />
        <AiOutlineSearch
          size={30}
          className={`${styles.searchIcon} absolute right-2 top-1.5 cursor-pointer`}
        />
        {searchData && searchData.length !== 0 && (
          <div
            className={`${styles.searchResults} absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4`}
          >
            {searchData.map((product, index) => (
              <Link
                to={`/product/${product.name.replace(/\s+/g, "-")}`}
                key={index}
                className={`${styles.resultItem} w-full flex items-start py-3`}
              >
                <img
                  src={product.image_Url[0].url}
                  alt=""
                  className="w-[40px] h-[40px] mr-[10px]"
                />
                <h1>{product.name}</h1>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* navitems */}
        <div className={`${styles.noramlFlex}`}>
          <Navbar active={activeHeading} />
        </div>
        <div className="flex">
          <div className={`${styles.noramlFlex}`}>
            <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center"></span>
          </div>
        </div>
        <div className={`${styles.noramlFlex}`}>
          <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 text-white font-mono text-[12px] leading-tight text-center mr-0"></span>
        </div>
        <div className={`${styles.noramlFlex}`}>
        <div className="realtive cursor-pointer mr-[15px]">
          <Link to="/login">
            <CgProfile size={40} color="rgb(255 255 255 / 100%)" />
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Header;
