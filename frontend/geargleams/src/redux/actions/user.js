import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    // Implement the loading logic for seller here
  } catch (error) {
    // Implement error handling for seller loading here
  }
};

// update user information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      // Dispatch an action indicating the request is being made
      dispatch({
        type: "UpdateUserRequest",
      });

      // Make the API call to update user information
      const { data } = await axios.put(
        `${server}/user/update`,
        { name, email, phoneNumber, password },
        { withCredentials: true }
      );

      // Dispatch an action indicating the update was successful
      dispatch({
        type: "UpdateUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      // Dispatch an action indicating the update failed
      dispatch({
        type: "UpdateUserFail",
        payload: error.response.data.message,
      });
    }
  };

// get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/user/all`, {
      withCredentials: true,
    });
    dispatch({
      type: "GetAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "GetAllUsersFail",
      payload: error.response.data.message,
    });
  }
};
