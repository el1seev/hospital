import axios from 'axios';

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

export const fetchAppointments = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
