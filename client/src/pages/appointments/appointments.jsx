import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import ReceptionTel from '../../components/reception-tel/reception-tel';
import { fetchAppointments } from '../../api/fetchData';
import CancelButton from '../../assets/svgs/cancel-button';
import { bookAppointment } from '../../api/sendData';
import './appointments.css';
import AppointmentItem from '../../components/appointment-item/appointment-item';

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);
  const [appointmentId, setAppointmentId] = useState('');
  const [formActive, setStateForm] = useState(false);
  const [form , setForm] = useState({passport: ''});
  
  const { id } = useParams();
  const navigate = useNavigate();

  const setActive = (appointmentCartId) => {
    setAppointmentId(appointmentCartId);
    setStateForm(!formActive);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };
  
  const submitBook = (event) => {
    event.preventDefault();
    const res = bookAppointment({...form, appointmentId: appointmentId});
    if( res.success === true ){
      navigate(`/employees/${id}/appointments`, { replace: true });
      window.location.reload();
    }
  };

  const handleDoctorsAppointments = async () => {
    const res = await fetchAppointments(id);
    setAppointments(res.appointments);
  };


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    handleDoctorsAppointments();
  }, [id]);

  return (
    <div className='appointments-page'>
      {
        !appointments 
          ?
          <p className='loading'>Загрузка...</p>
          :
          !formActive ?
            <>
              <ReceptionTel/>
              <div className='appointments-wrap'>
                {
                  appointments.map( appointment => (
                    <AppointmentItem appointment={appointment} setActive={setActive} key={appointment._id}/>
                  ))
                }
              </div>
            </>
            :
            <>
              <div className='book-form' onClick={setActive}>
                <button className='cancel-button' onClick={setActive}>
                  <CancelButton />
                </button>
                <form className='form' onClick={handleClick}>
                  <label>Введите серию паспорта
                    <input onChange={changeHandler} type='text' id='passport' name='passport' placeholder='AB0000000'/>
                  </label>
                  <button className='book-button' onClick={submitBook}>записаться</button>
                </form>
              </div>
            </>
      }
    </div>
  );
};

export default Appointments;