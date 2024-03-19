import axios from "../utils/Http"; // Assuming you have configured Axios properly
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_DOCTORS: "/doctor",
  GET_DOCTOR: "/doctor/:id",
  CREATE_DOCTOR: "/doctor",
  UPDATE_DOCTOR: "/doctor/:id",
  DELETE_DOCTOR: "/doctor/:id",
};

export const getAllDoctors = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/doctor");

    dispatch({ type: ACTIONS.GET_ALL_DOCTORS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getDoctor = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/doctor/${id}`);

    dispatch({ type: ACTIONS.GET_DOCTOR, data });
  } catch (error) {
    console.log(error);
  }
};


export const createDoctor = (doctor) => async (dispatch) => {
  try {
    const { data } = await axios.post("/doctor", doctor);
    
    
    // dispatch(getAllDoctors());
    dispatch({ type: ACTIONS.CREATE_DOCTOR, data });
    toast.success("Doctor created successfully");
  } catch (error) {
    toast.error("Error while creating doctor");
  }
};

export const updateDoctor = (id, doctor) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/doctor/${id}`, doctor);
    dispatch({ type: ACTIONS.UPDATE_DOCTOR, data });
    toast.success("Doctor updated successfully");
  } catch (error) {
    toast.error("Error while updating doctor");
  }
};

export const deleteDoctor = (id) => async (dispatch) => {
  try {
    await axios.delete(`/doctor/${id}`);
    dispatch({ type: ACTIONS.DELETE_DOCTOR, id });
    toast.success("Doctor deleted successfully");
  } catch (error) {
    toast.error("Error while deleting doctor");
  }
};
