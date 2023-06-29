import axios from 'axios';

import { checkToken } from '../helpers/checkToken';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/doctors');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/services');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSpecializations = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/specializations');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/categories');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAppointments = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAppointmentsByPatientId = async () => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.get(
        `http://localhost:5000/api/myappointments/${verifiedToken.decodedToken.userId}`,
        { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllPatients = async () => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.get('http://localhost:5000/api/patients', { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
