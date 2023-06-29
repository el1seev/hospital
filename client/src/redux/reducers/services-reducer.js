import { SET_SERVICES } from '../action-types/action-types';


const initialState = {
  services: [],
};

const servicesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
  case SET_SERVICES:
    return {
      ...state,
      services: payload,
    };
  default:
    return state;
  }
};

export default servicesReducer;