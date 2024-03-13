import { ACTIONS } from "../actions/InvoiceActions";

const initialState = {
  allInvoices: {
    loaded: false,
    data: [],
  },
  selectedInvoice: {
    loaded: false,
    data: {},
  },
  invoicesByDoctor: {
    loaded: false,
    data: [],
  },
  invoicesByPatient: {
    loaded: false,
    data: [],
  },
  invoiceStatus: {
    loaded: false,
    data: {},
  },
  invoiceStatement: {
    loaded: false,
    data: {},
  },
};

const InvoiceData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_INVOICES:
      return {
        ...state,
        allInvoices: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_INVOICE:
      return {
        ...state,
        allInvoices: {
          loaded: true,
          data: [...state.allInvoices.data, data],
        },
      };
    case ACTIONS.UPDATE_INVOICE:
      return {
        ...state,
        allInvoices: {
          loaded: true,
          data: state.allInvoices.data.map((invoice) =>
            invoice?._id === data._id ? data : invoice
          ),
        },
      };
    case ACTIONS.DELETE_INVOICE:
      return {
        ...state,
        allInvoices: {
          loaded: true,
          data: state.allInvoices.data.filter(
            (invoice) => invoice?._id !== data
          ),
        },
      };
    case ACTIONS.GET_INVOICES_BY_PATIENT_ID:
      return {
        ...state,
        invoicesByPatient: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_INVOICE_BY_ID:
      return {
        ...state,
        selectedInvoice: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_INVOICES_BY_DOCTOR_ID:
      return {
        ...state,
        invoicesByDoctor: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_INVOICES_BY_DATE:
      return {
        ...state,
        allInvoices: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.INVOICE_STATEMENT:
      return {
        ...state,
        invoiceStatement: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CLINIC_STATEMENT:
      return {
        ...state,
        invoiceStatement: {
          loaded: true,
          data,
        },
      };
    default:
      return state;
  }
};

export default InvoiceData;
