import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { fetchAppointmentsByPatientId } from '../../api/fetchData';
import AppointmentItem from '../../components/appointment-item/appointment-item';
import './profile.css';
import { cancelAppointment } from '../../api/sendData';

const Profile = () => {
  const [user, setUserInfo] = useState(null);
  const [userAppointments, setUserAppointments] = useState(null);

  const handleUserAppointments = async () => {
    const res = await fetchAppointmentsByPatientId();
    setUserAppointments(res.patientAppointments);
  }

  const cancelUserAppointment = async (appointmentId) => {
    const canceledAppointment = await cancelAppointment(appointmentId);
    window.location.reload();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    setUserInfo({firstName: decodedToken.firstName, secondName: decodedToken.secondName});
    handleUserAppointments();
  }, [])

  return (
    <div className='profile-page'>
      {
        !user && userAppointments === null ?
        <p className='loading'>Загрузка...</p>
        :
        <>
        <p className='user-info'>{user.secondName} {user.firstName}</p>
        {userAppointments !== null && userAppointments.length > 0 ? 
        <div className='appointments-wrap'>
          {userAppointments.map( (appointment) => (
            <AppointmentItem appointment={appointment} cancelAppointment={cancelUserAppointment}/>
            ))
          }
        </div>
        :
        <div className='no-appointments-wrap'>
          <p className='no-appointments'>У Вас нет талонов</p>
        </div>
        }
        </>
      }
    </div>
  );
}

export default Profile;