import 
{ BOOK_APPOINTMENT, GET_APPOINTMENTS, GET_EMPLOYEES,
GET_SERVICES, SET_APPOINTMENTS, SET_EMPLOYEES, SET_SERVICES
} from "../action-types/action-types";

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

//get and set appoinments
export const getAppointments = () => {
  return {
    type: GET_APPOINTMENTS,
  };
};

export const setAppointments = (appointments) => {
  return {
    type: SET_APPOINTMENTS,
    payload: appointments,
  };
};
//book appointment
export const bookAppointment = (appointment) => {
  return {
    type: BOOK_APPOINTMENT,
    payload: appointment,
  };
};