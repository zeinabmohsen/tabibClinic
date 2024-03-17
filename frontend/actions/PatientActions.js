import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_PATIENTS: "/patient/get",
  CREATE_PATIENT: "/patient/create",
  UPDATE_PATIENT: "/patient/:id",
  DELETE_PATIENT: "/patient/:id",
  GET_PATIENT_BY_ID: "/patient/:id",
  GET_PATIENTS_BY_DOCTOR: "/patient/doctor/:doctorId",
};

export const getAllPatients = (search) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/patient?search=${search ? search : ""}`);
    dispatch({ type: ACTIONS.GET_ALL_PATIENTS, data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ACTIONS.GET_ALL_PATIENTS, data: [] });
  }
};

export const createPatient = (patient) => async (dispatch) => {
  try {
    const { data } = await axios.post("/patient", patient);
    toast.success("Patient created successfully");
    dispatch({ type: ACTIONS.CREATE_PATIENT, data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePatient = (id, patient) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/patient/${id}`, patient);
    dispatch({ type: ACTIONS.UPDATE_PATIENT, data });
    toast.success("Patient updated successfully");
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error);
  }
};

export const deletePatient = (id) => async (dispatch) => {
  try {
    await axios.delete(`/patient/${id}`);
    dispatch({ type: ACTIONS.DELETE_PATIENT, id });
    toast.success("Patient deleted successfully");
  } catch (error) {
    toast.error("Error while deleting patient");
  }
};

export const getPatientById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/patient/${id}`);
    dispatch({ type: ACTIONS.GET_PATIENT_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getPatientsByDoctor = (doctorId, search) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/patient/doctor/${doctorId}?search=${search ? search : ""}`
    );
    dispatch({ type: ACTIONS.GET_PATIENTS_BY_DOCTOR, data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ACTIONS.GET_PATIENTS_BY_DOCTOR, data: [] });
  }
};
