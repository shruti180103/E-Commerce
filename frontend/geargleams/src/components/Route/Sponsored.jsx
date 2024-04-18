import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzjJp-7L5dTlClvr8T33grQVguje4jF4hotUKG3Qfjg&s"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://car-logos.b-cdn.net/wp-content/uploads/2023/04/jk-tyre-logo-present-scaled.webp"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="data:image/png;base64,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"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP82P_zbhYy_gj7SNiZoghQgMax-xPWghwJWZlAqG61g&s"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
