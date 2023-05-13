import { SET_APPOINTMENTS } from "../action-types/action-types";


const initialState = {
  appointments: [],
};

const appointmentsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_APPOINTMENTS:
      return {
        ...state,
        appointmentss: payload,
      };
    default:
      return state;
  }
};

export default appointmentsReducer;