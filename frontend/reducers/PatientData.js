import { ACTIONS } from "../actions/PatientActions";

const initialState = {
  allPatients: {
    loaded: false,
    data: [],
  },
  selectedPatient: {
    loaded: false,
    data: {},
  },
  patientsByDoctor: {
    loaded: false,
    data: [],
  },
};

const PatientData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_PATIENTS:
      return {
        ...state,
        allPatients: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_PATIENT_BY_ID:
      return {
        ...state,
        selectedPatient: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_PATIENT:
      return {
        ...state,
        allPatients: {
          loaded: true,
          data: [...state.allPatients.data, data],
        },
      };
    case ACTIONS.UPDATE_PATIENT:
      return {
        ...state,
        allPatients: {
          loaded: true,
          data: state.allPatients.data.map((patient) =>
            patient?.id === data.id ? data : patient
          ),
        },
      };
    case ACTIONS.DELETE_PATIENT:
      return {
        ...state,
        allPatients: {
          loaded: true,
          data: state.allPatients.data.filter(
            (patient) => patient?.id !== data
          ),
        },
      };
    case ACTIONS.GET_PATIENTS_BY_DOCTOR:
      return {
        ...state,
        patientsByDoctor: {
          loaded: true,
          data,
        },
      };
    default:
      return state;
  }
};

export default PatientData;
