import { ACTIONS } from "../actions/AppointmentActions";

const initialState = {
  allAppointments: {
    loaded: false,
    data: [],
  },
  selectedAppointment: {
    loaded: false,
    data: {},
  },
  appointmentsByDoctor: {
    loaded: false,
    data: [],
  },
  appointmentsByPatient: {
    loaded: false,
    data: [],
  },
  appointmentStatus: {
    loaded: false,
    data: {},
  },
};

const AppointmentData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_APPOINTMENTS:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_APPOINTMENT:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: [...state.allAppointments.data, data],
        },
      };
    case ACTIONS.UPDATE_APPOINTMENT:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: state.allAppointments.data.map((appointment) =>
            appointment.id === data.id ? data : appointment
          ),
        },
      };
    case ACTIONS.DELETE_APPOINTMENT:
      return {
        ...state,
        allAppointments: {
          loaded: true,
          data: state.allAppointments.data.filter(
            (appointment) => appointment.id !== data
          ),
        },
      };
    case ACTIONS.GET_APPOINTMENT_BY_ID:
      return {
        ...state,
        selectedAppointment: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_APPOINTMENT_BY_DOCTOR_ID:
      return {
        ...state,
        appointmentsByDoctor: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_APPOINTMENT_BY_PATIENT_ID:
      return {
        ...state,
        appointmentsByPatient: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.UPDATE_APPOINTMENT_STATUS:
      return {
        ...state,
        appointmentStatus: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.GET_APPOINTMENTS_BY_LOGGED_IN_DOCTOR:
      return {
        ...state,
        appointmentsByDoctor: {
          loaded: true,
          data,
        },
      };
    default:
      return state;
  }
};

export default AppointmentData;
