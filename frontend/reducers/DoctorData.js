import { ACTIONS } from "../actions/DoctorActions";

const initialState = {
  allDoctors: {
    loaded: false,
    data: [],
  },
  selectedDoctor: {
    loaded: false,
    data: {},
  },
};

const DoctorData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_DOCTORS:
      return {
        ...state,
        allDoctors: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_DOCTOR:
      return {
        ...state,
        selectedDoctor: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_DOCTOR:
      return {
        ...state,
        allDoctors: {
          loaded: true,
          data: [...state.allDoctors.data, data],
        },
      };
    case ACTIONS.UPDATE_DOCTOR:
      return {
        ...state,
        allDoctors: {
          loaded: true,
          data: state.allDoctors.data.map((doctor) =>
            doctor._id === data._id ? data : doctor
          ),
        },
      };
    case ACTIONS.DELETE_DOCTOR:
      return {
        ...state,
        allDoctors: {
          loaded: true,
          data: state.allDoctors.data.filter(
            (doctor) => doctor._id !== data._id
          ),
        },
      };
    default:
      return state;
  }
};

export default DoctorData;
