import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_SECRETARY: "/secretaries",
  UPDATE_SECRETARY: "/secretaries/:id",
  DELETE_SECRETARY: "/secretaries/:id",
  GET_SECRETARY_BY_ID: "/secretaries/:id",
};

export const createSecretary = (secretaryData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/secretaries", secretaryData);
    dispatch({ type: ACTIONS.CREATE_SECRETARY, data });
  } catch (error) {
    toast.error("Error while creating secretary");
  }
};

export const updateSecretary = (id, secretaryData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/secretaries/${id}`, secretaryData);
    dispatch({ type: ACTIONS.UPDATE_SECRETARY, data });
  } catch (error) {
    toast.error("Error while updating secretary");
  }
};

export const deleteSecretary = (id) => async (dispatch) => {
  try {
    await axios.delete(`/secretaries/${id}`);
    dispatch({ type: ACTIONS.DELETE_SECRETARY, id });
  } catch (error) {
    toast.error("Error while deleting secretary");
  }
};

export const getSecretaryById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/secretaries/${id}`);
    dispatch({ type: ACTIONS.GET_SECRETARY_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};
