import { ACTIONS } from "../actions/UserActions";

const initialState = {
  data: {},
};

const UserData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.LOGIN_USER:
      return {
        ...state,
        data,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        data,
      };
    default:
      return state;
  }
};

export default UserData;
