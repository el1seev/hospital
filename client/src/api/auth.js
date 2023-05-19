import axios from 'axios';

export const authenticate = async (data) => {
  try {
    console.log(data)
    const response = await axios.post('http://localhost:5000/api/login', {passportId: data.passport, password: data.password});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};