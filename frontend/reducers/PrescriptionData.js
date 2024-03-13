import { ACTIONS } from "../actions/PrescriptionActions";

const initialState = {
  loaded: false,
  allPrescriptions: [],
  patientPrescriptions: [],
  selectedPrescription: {},
};

const PrescriptionData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.CREATE_PRESCRIPTION:
      return {
        ...state,
        allPrescriptions: [...state.allPrescriptions, data],
      };
    case ACTIONS.DELETE_PRESCRIPTION:
      return {
        ...state,
        allPrescriptions: state.allPrescriptions.filter(
          (prescription) => prescription.id !== data
        ),
      };
    case ACTIONS.GET_PRESCRIPTION_BY_ID:
      return {
        ...state,
        selectedPrescription: data,
      };
    case ACTIONS.UPDATE_PRESCRIPTION:
      return {
        ...state,
        allPrescriptions: state.allPrescriptions.map((prescription) =>
          prescription.id === data.id ? data : prescription
        ),
      };
    case ACTIONS.GET_PRESCRIPTIONS_BY_PATIENT_ID:
      return {
        ...state,
        patientPrescriptions: data,
      };
    default:
      return state;
  }
};

export default PrescriptionData;
