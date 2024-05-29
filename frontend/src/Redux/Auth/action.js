import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

export const register = (signup_data) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await fetch("https://spack-solutions.onrender.com/userauth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup_data),
    });
    const data = await res.json();
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
    // console.log(data);
    return data;
  } catch (err) {
    dispatch({ type: SIGNUP_ERROR, payload: err.message });
    // return err.response.data.msg;
  }
};

export const logIn = (signin_data) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const res = await fetch("https://spack-solutions.onrender.com/userauth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin_data),
    });
    const data = await res.json();
    const { token } = data;
    dispatch({ type: SIGNIN_SUCCESS, payload: { token } });
    // console.log(token);
    return data;
  } catch (error) {
    dispatch({ type: SIGNIN_ERROR });
    //  return error.response.data.msg;
  }
};

export const logoutUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log("Token before logout:", token);
  dispatch({ type: LOGOUT_REQUEST });
  try {
    await fetch("https://spack-solutions.onrender.com/userauth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: null,
    });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    throw err;
  }
};
