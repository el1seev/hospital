import axios from 'axios';

import { checkToken } from '../helpers/checkToken';
import { filterObject } from '../helpers/filterObjects';


export const bookAppointment = async (data) => {
  try {
    const response = await axios.put('http://localhost:5000/api/appointments/book', {passportId: data.passport, appointmentId: data.appointmentId});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.put(
        `http://localhost:5000/api/myappointments/cancel/${verifiedToken.decodedToken.userId}`,
        {appointmentId}, { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};


export const UpdateDoctor = async (args) => {
  try {
    const verifiedToken = checkToken();
    const filteredObj = filterObject(args);
    if(verifiedToken){
      let response = await axios.put(
        `http://localhost:5000/api/doctors/${args.id}`,
        {...filteredObj}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};



export const UpdatePatient = async (args) => {
  try {
    const verifiedToken = checkToken();
    const filteredObj = filterObject(args);
    if(verifiedToken){
      let response = await axios.put(
        `http://localhost:5000/api/patients/${args.id}`,
        {...filteredObj}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const UpdateService = async (args) => {
  try {
    const verifiedToken = checkToken();
    const filteredObj = filterObject(args);
    if(verifiedToken){
      let response = await axios.put(
        `http://localhost:5000/api/services/${args.id}`,
        {...filteredObj}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const UpdateServiceDescription = async (args) => {
  try {
    const verifiedToken = checkToken();
    const filteredObj = filterObject(args);
    if(verifiedToken){
      let response = await axios.put(
        `http://localhost:5000/api/services/description/${args.id}`,
        {...filteredObj}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const UpdateSpecialization = async (args) => {
  try {
    const verifiedToken = checkToken();
    const filteredObj = filterObject(args);
    if(verifiedToken){
      let response = await axios.put(
        `http://localhost:5000/api/specializations/${args.id}`,
        {...filteredObj}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const UpdateCategory = async (args) => {
  try {
    const verifiedToken = checkToken();
    const filteredObj = filterObject(args);
    if(verifiedToken){
      let response = await axios.put(
        `http://localhost:5000/api/categories/${args.id}`,
        {...filteredObj}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};