import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_PRESCRIPTION: "/prescription",
  DELETE_PRESCRIPTION: "/prescription/:prescriptionId",
  GET_PRESCRIPTION_BY_ID: "/prescription/:prescriptionId",
  UPDATE_PRESCRIPTION: "/prescription/:prescriptionId",
  GET_PRESCRIPTIONS_BY_PATIENT_ID: "/prescription/patient/:patientId",
};

export const createPrescription =
  (patientId, prescriptionData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/prescription/${patientId}`,
        prescriptionData
      );
      toast.success("Prescription created successfully");
      dispatch({ type: ACTIONS.CREATE_PRESCRIPTION, data });
    } catch (error) {
      toast.error("Error while creating prescription");
    }
  };

export const deletePrescription = (prescriptionId) => async (dispatch) => {
  try {
    await axios.delete(`/prescription/${prescriptionId}`);

    toast.success("Prescription deleted successfully");
    dispatch({ type: ACTIONS.DELETE_PRESCRIPTION, prescriptionId });
  } catch (error) {
    toast.error("Error while deleting prescription");
  }
};

export const getPrescriptionById = (prescriptionId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/prescription/${prescriptionId}`);
    dispatch({ type: ACTIONS.GET_PRESCRIPTION_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePrescription =
  (prescriptionId, prescriptionData) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/prescription/${prescriptionId}`,
        prescriptionData
      );
      dispatch({ type: ACTIONS.UPDATE_PRESCRIPTION, data });
    } catch (error) {
      toast.error("Error while updating prescription");
    }
  };

export const getPrescriptionsByPatientId = (patientId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/prescription/patient/${patientId}`);
    dispatch({ type: ACTIONS.GET_PRESCRIPTIONS_BY_PATIENT_ID, data });
  } catch (error) {
    console.log(error);
  }
};
