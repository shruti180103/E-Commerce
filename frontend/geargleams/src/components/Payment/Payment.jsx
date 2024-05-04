import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const razorpayPaymentHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/payment/razorpay/create-order`,
        order,
        config
      );

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        amount: Math.round(orderData?.totalPrice * 100), // amount in the smallest currency unit
        currency: "INR",
        name: "Your Company Name",
        description: "Payment for Order",
        image: "https://your-company-logo.png",
        order_id: data.id,
        handler: async (response) => {
          // Handle success payment response
          console.log("Payment successful:", response);
          await axios.post(`${server}/order/create-order`, {
            ...order,
            paymentInfo: {
              id: response.razorpay_payment_id,
              status: "success",
              type: "UPI",
            },
          });
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          navigate("/order/success");
          toast.success("Order successful!");
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        notes: {
          address: orderData?.shippingAddress,
        },
        theme: {
          color: "#F63B60",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Razorpay payment error:", error);
      toast.error("Payment failed. Please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            razorpayPaymentHandler={razorpayPaymentHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({ razorpayPaymentHandler }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with UPI
          </h4>
        </div>

        <div className="w-full flex border-b">
          <form className="w-full" onSubmit={razorpayPaymentHandler}>
            <input
              type="submit"
              value="Pay Now"
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "$" + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
