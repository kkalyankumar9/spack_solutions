import { GET_ERROR, GET_REQUEST, GET_SUCCESS } from "./actionType";

export const getSubdata = () => async (dispatch) => {
    dispatch({ type: GET_REQUEST });
    try {
      const response = await fetch("https://spack-solutions.onrender.com/subscribe/getData", {
        headers: {
          Authorization: ` ${localStorage.getItem("token")}`, 
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const res = await response.json();
    //   console.log(res.Data.monthly)
      dispatch({ type: GET_SUCCESS, payload: res.Data }); // Dispatching data instead of response
   
    } catch (error) {
      dispatch({ type: GET_ERROR });
      console.error(error);
    }
  };