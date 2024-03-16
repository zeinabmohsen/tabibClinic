import { ACTIONS } from "../actions/ServiceActions";

const initialState = {
  allServices: [],
  selectedService: {},
};

const ServiceData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.SELECT_SERVICE:
      return {
        ...state,
        selectedService: data,
      };
    case ACTIONS.GET_SERVICES:
      return {
        ...state,
        allServices: data,
      };
    case ACTIONS.CREATE_SERVICE:
      return {
        ...state,
        allServices: [...state.allServices, data],
      };
    case ACTIONS.DELETE_SERVICE:
      return {
        ...state,
        allServices: state.allServices.filter(
          (service) => service._id !== data
        ),
      };
    case ACTIONS.CLEAR_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: {},
      };
    default:
      return state;
  }
};

export default ServiceData;
