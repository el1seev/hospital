import 
{ BOOK_APPOINTMENT, GET_EMPLOYEES,
  GET_SERVICES, GET_SPECIALIZATIONS, SET_EMPLOYEES, SET_SERVICES, SET_SPECIALIZATIONS,
} from '../action-types/action-types';

//get and set list of employees
export const getEmployees = () => {
  return {
    type: GET_EMPLOYEES,
  };
};

export const setEmployees = (employees) => {
  return {
    type: SET_EMPLOYEES,
    payload: employees,
  };
};

//get and set list of services
export const getServices = () => {
  return {
    type: GET_SERVICES,
  };
};

export const setServices = (services) => {
  return {
    type: SET_SERVICES,
    payload: services,
  };
};
//book appointment
export const bookAppointment = (appointment) => {
  return {
    type: BOOK_APPOINTMENT,
    payload: appointment,
  };
};
//get and set specializations
export const getSpecializations = () => {
  return {
    type: GET_SPECIALIZATIONS,
  };
};

export const setSpecializations = (specializations) => {
  return {
    type: SET_SPECIALIZATIONS,
    payload: specializations,
  };
};