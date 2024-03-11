import { ACTIONS } from "../actions/AdminActions";

const initialState = {
  allUsers: [],
  selectedUser: {},
};

const AdminData = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_USERS:
      return { ...state, allUsers: action.data };
    case ACTIONS.GET_USER_BY_ID:
      return { ...state, selectedUser: action.data };
    case ACTIONS.CREATE_USER:
      return { ...state, allUsers: [...state.allUsers, action.data] };
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.id === action.data.id ? action.data : user
        ),
      };
    case ACTIONS.DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.userId),
      };
    default:
      return state;
  }
};

export default AdminData;