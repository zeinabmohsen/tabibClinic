import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_DOCTOR_SCHEDULE: "/schedule/:doctorId",
  GET_DOCTOR_SCHEDULE: "/schedule/:doctorId",
  UPDATE_DOCTOR_SCHEDULE: "/schedule/:doctorId/:scheduleId",
  DELETE_DOCTOR_SCHEDULE: "/schedule/:doctorId/:scheduleId",
};

export const createDoctorSchedule =
  (doctorId, scheduleData) => async (dispatch) => {
    try {
      const { data } = await axios.post(`/schedule/${doctorId}`, scheduleData);
      toast.success("Doctor schedule created successfully");
      dispatch({ type: ACTIONS.CREATE_DOCTOR_SCHEDULE, data });
    } catch (error) {
      toast.error("Error while creating doctor schedule");
      console.log(error);
    }
  };

export const getDoctorSchedule = (doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/schedule/${doctorId}`);
    dispatch({ type: ACTIONS.GET_DOCTOR_SCHEDULE, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDoctorSchedule =
  (doctorId, scheduleId, scheduleData) => async (dispatch) => {
    try {
      console.log("updateDoctorSchedule", scheduleData);
      const { data } = await axios.put(`/schedule/${doctorId}/${scheduleId}`, {
        id: scheduleId,
        weekdays: scheduleData,
      });

      toast.success("Doctor schedule updated successfully");
      dispatch(getDoctorSchedule(doctorId));
    } catch (error) {
      toast.error("Error while updating doctor schedule");
    }
  };

export const deleteDoctorSchedule =
  (doctorId, scheduleId) => async (dispatch) => {
    try {
      await axios.delete(`/schedule/${doctorId}/${scheduleId}`);
      dispatch({ type: ACTIONS.DELETE_DOCTOR_SCHEDULE, doctorId, scheduleId });
    } catch (error) {
      toast.error("Error while deleting doctor schedule");
    }
  };
