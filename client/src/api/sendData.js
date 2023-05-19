import axios from 'axios';
import jwt_decode from 'jwt-decode';


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
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      const response = await axios.put(`http://localhost:5000/api/myappointments/cancel/${decodedToken.userId}`, {appointmentId}, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}