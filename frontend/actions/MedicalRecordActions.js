import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_MEDICAL_RECORD: "/record",
  UPDATE_MEDICAL_RECORD: "/record/:id",
  DELETE_MEDICAL_RECORD: "/record/:id",
  GET_MEDICAL_RECORD_BY_ID: "/record/:id",
  GET_MEDICAL_RECORDS_BY_PATIENT_ID: "/record/patient/:patientId",
  ADD_PRESCRIPTION_T0_RECORD: "/record/:medicalRecordId/add-prescriptions",
  ADD_ATTACHMENT_TO_RECORD: "/record/:medicalRecordId/attachment",
  DELETE_ATTACHMENT_FROM_RECORD: "/record/:medicalRecordId/attachment/:attachmentId",
};

export const createMedicalRecord =
  (patientId, { title, description }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`/record/${patientId}`, {
        title,
        description,
      });

      toast.success("Medical record created successfully");
      dispatch({ type: ACTIONS.CREATE_MEDICAL_RECORD, data });
    } catch (error) {
      toast.error("Error while creating medical record");
    }
  };

export const updateMedicalRecord =
  (id, { title, description, fees }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.put(`/record/${id}`, {
        title,
        description,
        fees,
      });
      toast.success("Medical record updated successfully");
      dispatch({ type: ACTIONS.UPDATE_MEDICAL_RECORD, data });
    } catch (error) {
      toast.error("Error while updating medical record");
    }
  };

export const deleteMedicalRecord = (id) => async (dispatch) => {
  try {
    await axios.delete(`/record/${id}`);
    toast.success("Medical record deleted successfully");
    dispatch({ type: ACTIONS.DELETE_MEDICAL_RECORD, id });
  } catch (error) {
    toast.error("Error while deleting medical record");
  }
};

export const getMedicalRecordById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/record/${id}`);
    dispatch({ type: ACTIONS.GET_MEDICAL_RECORD_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalRecordsByPatientId = (patientId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/record/patient/${patientId}`);
    dispatch({ type: ACTIONS.GET_MEDICAL_RECORDS_BY_PATIENT_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const addPrescriptionToRecord =
  (medicalRecordId, formData) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/record/${medicalRecordId}/add-prescriptions`,
        formData
      );
      toast.success("Prescription added to medical record successfully");
      dispatch({ type: ACTIONS.ADD_PRESCRIPTION_T0_RECORD, data });
    } catch (error) {
      toast.error("Error while adding prescription to medical record");
      console.log(error);
    }
  };

export const addAttachmentToRecord =
  (medicalRecordId, formData) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/record/${medicalRecordId}/attachment`,
        formData
      );
      toast.success("Attachment added to medical record successfully");
      dispatch({ type: ACTIONS.ADD_PRESCRIPTION_T0_RECORD, data });
    } catch (error) {
      toast.error("Error while adding attachment to medical record");
      console.log(error);
    }
  };

export const deleteAttachmentFromRecord =
  (medicalRecordId, attachmentId) => async (dispatch) => {
    try {
      console.log(medicalRecordId, attachmentId);
      const { data } = await axios.delete(
        `/record/${medicalRecordId}/attachment/${attachmentId}`
      );
      toast.success("Attachment deleted from medical record successfully");
      dispatch({ type: ACTIONS.DELETE_ATTACHMENT_FROM_RECORD, data });
    } catch (error) {
      toast.error("Error while deleting attachment from medical record");
      console.log(error);
    }
  };
