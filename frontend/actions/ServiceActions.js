import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_SERVICES: "/service",
  CREATE_SERVICE: "/service",
  UPDATE_SERVICE: "/service/:id",
  DELETE_SERVICE: "/service/:id",
  SELECT_SERVICE: "/service",
  CLEAR_SELECTED_SERVICE: "/service", 
};

export const getServices = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/service");
    dispatch({ type: ACTIONS.GET_SERVICES, data });
  } catch (error) {
    console.log(error);
  }
};

export const createService = (service) => async (dispatch) => {
  try {
    const { data } = await axios.post("/service", service);
    toast.success("Service created successfully");
    dispatch(getServices());
  } catch (error) {
    toast.error("Error while creating service");
    console.log(error);
  }
};

export const updateService = (id, service) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/service/${id}`, {
      ...service,
    });
    toast.success("Service updated successfully");
    dispatch(getServices());
  } catch (error) {
    toast.error("Error while updating service");
    console.log(error);
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    await axios.delete(`/service/${id}`);
    toast.success("Service deleted successfully");
    dispatch({ type: ACTIONS.DELETE_SERVICE, id });
  } catch (error) {
    console.log(error);
  }
};

export const selectService = (data) => async (dispatch) => {
  dispatch({ type: ACTIONS.SELECT_SERVICE, data });
};

export const clearSelectedService = () => async (dispatch) => {
  dispatch({ type: ACTIONS.CLEAR_SELECTED_SERVICE });
};
