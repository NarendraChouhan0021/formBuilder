import t from "./types";
import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

export const loginWithGoogle = () => async (dispatch) => {
  const userObj = {
    name: `narendra${Math.random()}`,
    email: `narendra${Math.random()}@gmail.com`,
    // image: res.profileObj.imageUrl
  };

  const { data } = await axios.post(API_URL + "login", userObj);
  if (data.accessToken) {
    localStorage.setItem("userTicket", JSON.stringify(data.accessToken));
  }
  await dispatch({ type: t.FETCH_USERPROFILE, payload: data });
};

export const fetchUser = (data) => async (dispatch) => {
  await dispatch({ type: t.FETCH_USERPROFILE, payload: data });
};
