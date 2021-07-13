const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        ...action.data
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        ...action.data
      };
    case SET_INTERVIEW:
      if (action.data) {
        const appointment = {
          ...state.appointments[action.data.id],
          interview: action.data.interview
        };
        const appointments = {
          ...state.appointments,
          [action.data.id]: appointment
        };
        const curDayObj = state.days.find((d) => d.name === state.day);
        const curIndex = state.days.findIndex((d) => d.name === state.day);
        const listNullApp = curDayObj.appointments.filter(
          (id) => !appointments[id].interview
        );
        const spots = listNullApp.length;
        const updatedDay = { ...curDayObj, spots };
        let days = [...state.days];
        days[curIndex] = updatedDay;
        return {
          ...state,
          appointments,
          days
        };
      }
      return state;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
