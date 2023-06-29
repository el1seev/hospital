import { SET_SPECIALIZATIONS } from '../action-types/action-types';


const initialState = {
  specializations: [],
};

const specializationsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
  case SET_SPECIALIZATIONS:
    return {
      ...state,
      specializations: payload,
    };
  default:
    return state;
  }
};

export default specializationsReducer;