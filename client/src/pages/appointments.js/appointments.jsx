import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReceptionTel from '../../components/reception-tel/reception-tel';
import { fetchAppointments } from '../../api/fetchData';
import './appointments.css';
import convertDate from '../../helpers/convertDate';

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);
  const { id } = useParams();

  const handleDoctorsAppointments = async () => {
    const res = await fetchAppointments(id);
    console.log(res.appointments)
    setAppointments(res.appointments);
  }

  useEffect(() => {
    handleDoctorsAppointments();
  }, [id])
  return (
    <div className='appointments-page'>
      <ReceptionTel/>
      {
      !appointments 
      ?
      <p className='loading'>Загрузка...</p>
      :
      <div className='appointments-wrap'>
        {
          appointments.map( appointment => (
            <div className='appointment-item'>
              <p className='appointment-info' style={{textTransform: 'uppercase'}}>{appointment.doctorId.secondName}</p>
              <p className='appointment-info'>{appointment.doctorId.specialization.name}</p>
              <p className='appointment-info'>{convertDate(appointment.dateTime)}</p>
              <button className='appointment-button'>ЗАПИСЬ</button>
            </div>
          ))
        }
      </div>
      }
    </div>
  );
}

export default Appointments;