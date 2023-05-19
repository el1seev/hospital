import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { redirect } from 'react-router-dom';

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
    console.log(response.data)
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
}

export const fetchAppointmentsByPatientId = async () => {
  try {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return redirect('./auth');
      }
      const response = await axios.get(`http://localhost:5000/api/myappointments/${decodedToken.userId}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
