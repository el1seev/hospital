import axios from 'axios';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/doctors');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};