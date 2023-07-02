import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { fetchAppointmentsByPatientId } from '../../api/fetchData';
import AppointmentItem from '../../components/appointment-item/appointment-item';
import { cancelAppointment } from '../../api/operations-update';
import './profile.css';

const Profile = (props) => {
  const [user, setUserInfo] = useState(null);
  const [userAppointments, setUserAppointments] = useState(null);

  const handleUserAppointments = async () => {
    const res = await fetchAppointmentsByPatientId();
    if(res !== undefined){
      setUserAppointments(res.patientAppointments);
    }
  };

  const cancelUserAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    setUserInfo({firstName: decodedToken.firstName, secondName: decodedToken.secondName});
    handleUserAppointments();
  }, []);

  return (
    <div className='profile-page' style={props.backgroundStyle}>
      {
        !user && userAppointments === null ?
          <p className='loading'>Загрузка...</p>
          :
          <>
            <p className='user-info' style={props.text}>{user.secondName} {user.firstName}</p>
            {userAppointments !== null && userAppointments.length > 0 ? 
              <div className='appointments-wrap'>
                {userAppointments.map( (appointment) => (
                  <AppointmentItem appointment={appointment} cancelAppointment={cancelUserAppointment} back={props.backgroundStyle} txt={props.text}/>
                ))
                }
              </div>
              :
              <div className='no-appointments-wrap'>
                <p className='no-appointments' style={props.text}>У Вас нет талонов</p>
              </div>
            }
          </>
      }
    </div>
  );
};

export default Profile;