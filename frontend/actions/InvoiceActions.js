import axios from "../utils/Http";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_INVOICE: "/invoice",
  UPDATE_INVOICE: "/invoice/:invoiceId",
  DELETE_INVOICE: "/invoice/:invoiceId",
  GET_ALL_INVOICES: "/",
  GET_INVOICES_BY_PATIENT_ID: "/invoice/patient/:invoiceId",
  GET_INVOICE_BY_ID: "/invoice/:invoiceId",
  GET_INVOICES_BY_DOCTOR_ID: "/invoice/doctor/:doctorId",
  GET_INVOICES_BY_DATE: "/invoice/day/:date",
  GET_INVOICES_AND_TOTAL: "/invoice/:date/:doctorId",
  INVOICE_STATEMENT: "/invoice/invoice/statement/",
  CLINIC_STATEMENT: "/invoice/clinic/statement/",
};

export const createInvoice = (patientId, invoice) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/invoice/${patientId}`, invoice);
    toast.success("Invoice created successfully");
    dispatch({ type: ACTIONS.CREATE_INVOICE, data });
  } catch (error) {
    toast.error("Error while creating invoice");
    console.log(error);
  }
};

export const updateInvoice = (id, invoice) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/invoice/${id}`, {
      ...invoice,
    });
    dispatch({ type: ACTIONS.UPDATE_INVOICE, data });
    toast.success("Invoice updated successfully");
  } catch (error) {
    toast.error("Error while updating invoice");
    console.log(error);
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    await axios.delete(`/invoice/${id}`);
    toast.success("Invoice deleted successfully");
    dispatch({ type: ACTIONS.DELETE_INVOICE, data: id });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoicesByPatientId = (patientId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoice/patient/${patientId}`);
    dispatch({ type: ACTIONS.GET_INVOICES_BY_PATIENT_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoice/${id}`);
    dispatch({ type: ACTIONS.GET_INVOICE_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoicesByDoctorId = (doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoice/doctor/${doctorId}`);
    console.log(data);
    dispatch({ type: ACTIONS.GET_INVOICES_BY_DOCTOR_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoicesByDate = (date) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoice/day/${date}`);
    dispatch({ type: ACTIONS.GET_INVOICES_BY_DATE, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllInvoices = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/invoice");
    dispatch({ type: ACTIONS.GET_ALL_INVOICES, data });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoicesAndTotal = (date, doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/invoice/${date}/${doctorId || ""}`);
    dispatch({ type: ACTIONS.GET_INVOICES_AND_TOTAL, data });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceStatement =
  ({ doctorId, startDate, endDate }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`/invoice/invoice/statement`, {
        doctorId,
        startDate,
        endDate,
      });

      dispatch({ type: ACTIONS.INVOICE_STATEMENT, data });
    } catch (error) {
      console.log(error);
    }
  };

export const getClinicStatement =
  ({ startDate, endDate }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`/invoice/clinic/statement`, {
        startDate,
        endDate,
      });

      dispatch({ type: ACTIONS.CLINIC_STATEMENT, data });
    } catch (error) {
      console.log(error);
    }
  };
