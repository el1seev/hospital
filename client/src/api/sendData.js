import axios from 'axios';
import { checkToken } from '../helpers/checkToken';


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
      const response = await axios.put(`http://localhost:5000/api/myappointments/cancel/${verifiedToken.decodedToken.userId}`, {appointmentId}, { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const addDoctor = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post('http://localhost:5000/api/doctors/add', {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }});
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const addCategory = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post('http://localhost:5000/api/category/add', {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }});
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const addSpecialization = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post('http://localhost:5000/api/specialization/add', {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }});
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const addPatient = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post('http://localhost:5000/api/patients/add', {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }});
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const addService = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post('http://localhost:5000/api/service/add', {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }});
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const addServiceDescription = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken)
    {
      let response = await axios.put(`http://localhost:5000/api/service/description/${args.id}`, {type: args.type, price: args.price}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }});
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const deletePatient = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(`http://localhost:5000/api/patients/${args.id}`, { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteEmployee = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(`http://localhost:5000/api/doctors/${args.id}`, { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteSpecialization = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(`http://localhost:5000/api/specializations/${args.id}`, { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteCategory = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(`http://localhost:5000/api/categories/${args.id}`, { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteService = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken)
    {
      const response = await axios.delete(`http://localhost:5000/api/services/${args.id}`, { headers: { Authorization: `Bearer ${verifiedToken.token}` } });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}