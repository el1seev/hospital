import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import ReceptionTel from '../../components/reception-tel/reception-tel';
import { fetchAppointments } from '../../api/fetchData';
import CancelButton from '../../assets/svgs/cancel-button';
import { bookAppointment } from '../../api/operations-update';
import AppointmentItem from '../../components/appointment-item/appointment-item';
import './appointments.css';

const Appointments = (props) => {
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
    <div className='appointments-page' style={props.backgroundStyle}>
      {
        !appointments 
          ?
          <p className='loading' style={props.text}>Загрузка...</p>
          :
          !formActive ?
            <>
              <ReceptionTel back={props.backgroundStyle} txt={props.text}/>
              <div className='appointments-wrap'>
                {
                  appointments.map( appointment => (
                    <AppointmentItem back={props.backgroundStyle} txt={props.text}
                      appointment={appointment} setActive={setActive} key={appointment._id}
                    />
                  ))
                }
              </div>
            </>
            :
            <>
              <div className='book-form' onClick={setActive} style={props.backgroundStyle}>
                <button className='cancel-button' onClick={setActive}>
                  <CancelButton buttonColor={props.text}/>
                </button>
                <form className={props.backgroundStyle ? `form_${props.backgroundStyle.backgroundColor}` : 'form'} onClick={handleClick}>
                  <label style={props.text}>Введите серию паспорта
                    <input onChange={changeHandler} type='text' id='passport' name='passport' placeholder='AB0000000'
                      style={props.text !== null ? {...props.text, border: `2px solid ${props.text.color}`} : null}
                    />  
                  </label>
                  
                  <button className={props.backgroundStyle ? `book-button_${props.backgroundStyle.backgroundColor}` : 'book-button'}
                    onClick={submitBook} style={props.text}
                  >
                  записаться
                  </button>
                </form>
              </div>
            </>
      }
    </div>
  );
};

export default Appointments;