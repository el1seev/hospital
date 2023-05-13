import { SET_EMPLOYEES } from "../action-types/action-types";


const initialState = {
  employees: [],
};

const employeesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };
    default:
      return state;
  }
};

export default employeesReducer;