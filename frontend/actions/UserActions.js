import { useRouter } from "next/router";
import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  LOGIN_USER: "/auth/login",
  GET_USER: "/user",
  LOGOUT_USER: "/auth/logout",
};

const token = global.window?.localStorage?.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", {
      ...formData,
    });

    if (data.success) {
      await toast.success("You have successfully logged in!");

      if (data.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        await localStorage.setItem("token", data.token);
      }
      if (data.token.refreshToken) {
        await localStorage.setItem("refreshToken", data.token.refreshToken);
      }
      router.push("/calendar");

      await dispatch({
        type: ACTIONS.LOGIN_USER,
        data: data.data,
      });
    } else {
      toast.error("Invalid email or password!");
    }
  } catch (error) {
    console.log(error, "error");
    toast.error("Invalid email or password!");
    return;
  }
};

export const getUser = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get("/user", { token });
    dispatch({
      type: ACTIONS.GET_USER,
      data,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

export const logout = () => async (dispatch) => {
  try {
    await localStorage.removeItem("token");
    await delete axios.defaults.headers.common["Authorization"];
  } catch (error) {
    console.log(error, "error");
  }
};
