import { ACTIONS } from "../actions/ScheduleActions";

const initialState = {
  schedule: {
    loaded: false,
    data: {
      weekdays: [
        { day: "Monday", startTime: "09:00", endTime: "17:00" },
        { day: "Tuesday", startTime: "09:00", endTime: "17:00" },
        { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
        { day: "Thursday", startTime: "09:00", endTime: "17:00" },
        { day: "Friday", startTime: "09:00", endTime: "17:00" },
      ],
    },
  },
};

const ScheduleData = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_DOCTOR_SCHEDULE:
      return {
        ...state,
        schedule: {
          loaded: true,
          data,
        },
      };
    case ACTIONS.CREATE_DOCTOR_SCHEDULE:
      return {
        ...state,
        schedule: {
          loaded: true,
          data,
        },
      };
    default:
      return state;
  }
};

export default ScheduleData;
