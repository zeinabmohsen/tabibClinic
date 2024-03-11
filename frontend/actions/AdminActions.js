import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_USERS: "/admin/users",
  CREATE_USER: "/admin/users",
  UPDATE_USER: "/admin/users/:userId",
  DELETE_USER: "/admin/users/:userId",
  GET_USER_BY_ID: "/admin/users/:userId",
  RESET_STATE: "RESET_STATE",
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/admin/users");

    dispatch({ type: ACTIONS.GET_ALL_USERS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/admin/users", user);

    toast.success("User created successfully");
    dispatch({ type: ACTIONS.CREATE_USER, data });
  } catch (error) {
    toast.error("Error while creating user");
    console.log(error);
  }
};

export const updateUser = (userId, user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/admin/users/${userId}`, user);
    toast.success("User updated successfully");
    dispatch({ type: ACTIONS.UPDATE_USER, data });
  } catch (error) {
    toast.error("Error while updating user");
    console.log(error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`/admin/users/${userId}`);
    toast.success("User deleted successfully");
    dispatch({ type: ACTIONS.DELETE_USER, userId });
  } catch (error) {
    toast.error("Error while deleting user");
  }
};

export const getUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/admin/users/${userId}`);
    dispatch({ type: ACTIONS.GET_USER_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const resetState = () => (dispatch) => {
  dispatch({ type: ACTIONS.RESET_STATE });
};
