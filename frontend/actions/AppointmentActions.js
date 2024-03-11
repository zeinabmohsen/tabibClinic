import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  GET_ALL_APPOINTMENTS: "/appointment",
  CREATE_APPOINTMENT: "/appointment",
  UPDATE_APPOINTMENT: "/appointment/:id",
  DELETE_APPOINTMENT: "/appointment/:id",
  GET_APPOINTMENT_BY_ID: "/appointment/:id",
  GET_APPOINTMENT_BY_DOCTOR_ID: "/appointment/doctor/:id",
  GET_APPOINTMENT_BY_PATIENT_ID: "/appointment/patient/:id",
  UPDATE_APPOINTMENT_STATUS: "/appointment/:id/:status",
  GET_APPOINTMENTS_BY_LOGGED_IN_DOCTOR: "/appointment/doctors/myappointments",
};

export const getAllAppointments = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/appointment");

    dispatch({ type: ACTIONS.GET_ALL_APPOINTMENTS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createAppointment = (appointment) => async (dispatch) => {
  try {
    const { data } = await axios.post("/appointment", appointment);

    toast.success("Appointment created successfully");
    dispatch(getAllAppointments());
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = (id, appointment) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/appointment/${id}`, appointment);

    toast.success("Appointment updated successfully");
    dispatch({ type: ACTIONS.UPDATE_APPOINTMENT, data });
  } catch (error) {
    toast.error("Error while updating appointment");
    console.log(error);
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    await axios.delete(`/appointment/${id}`);

    toast.success("Appointment deleted successfully");
    dispatch(getAllAppointments());

    dispatch({ type: ACTIONS.DELETE_APPOINTMENT, id });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/appointment/${id}`);

    dispatch({ type: ACTIONS.GET_APPOINTMENT_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsByDoctorId = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/appointment/doctor/${id}`);

    dispatch({ type: ACTIONS.GET_APPOINTMENT_BY_DOCTOR_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsByPatientId = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/appointment/patient/${id}`);

    dispatch({ type: ACTIONS.GET_APPOINTMENT_BY_PATIENT_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointmentStatus = (id, status) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/appointment/${id}/${status}`);

    dispatch(getAllAppointments());
    toast.success("Appointment status updated successfully");
  } catch (error) {
    toast.error("Error while updating appointment status");
  }
};

export const getAppointmentsByLoggedInDoctor = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/appointment/doctors/myappointments");

    dispatch({ type: ACTIONS.GET_APPOINTMENTS_BY_LOGGED_IN_DOCTOR, data });
  } catch (error) {
    console.log(error);
  }
};
