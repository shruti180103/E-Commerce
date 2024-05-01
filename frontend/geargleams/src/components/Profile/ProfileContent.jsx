import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { deleteUserAddress, loadUser, updateUserInformation } from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";

// Define or import the missing components
// For example:
// import AllOrders from "./AllOrders";
// import AllRefundOrders from "./AllRefundOrders";
// import TrackOrder from "./TrackOrder";
// import ChangePassword from "./ChangePassword";
// import Address from "./Address";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              {/* Form fields for updating user information */}
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          {/* Render the AllOrders component */}
          {/* <AllOrders /> */}
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          {/* Render the AllRefundOrders component */}
          {/* <AllRefundOrders /> */}
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          {/* Render the TrackOrder component */}
          {/* <TrackOrder /> */}
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          {/* Render the ChangePassword component */}
          {/* <ChangePassword /> */}
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          {/* Render the Address component */}
          {/* <Address /> */}
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
