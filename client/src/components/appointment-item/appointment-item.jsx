import doctorInitials from '../../helpers/doctorInitials';
import convertDate from '../../helpers/convertDate';
import './appointment-item.css'

const AppointmentItem = (props) => {
  return (
    <div className='appointment-item'>
    <p className='appointment-info' style={{textTransform: 'uppercase'}}>{doctorInitials(props.appointment.doctorId.secondName, props.appointment.doctorId.firstName, props.appointment.doctorId.middleName)}</p>
    <p className='appointment-info'>{props.appointment.doctorId.specialization.name}</p>
    <p className='appointment-info'>{convertDate(props.appointment.dateTime)}</p>
    {
    props.appointment.status !== 'занят' ?
    <button className='appointment-button' onClick={e => props.setActive(props.appointment._id)}>ЗАПИСЬ</button>
    :<button className='appointment-button' onClick={e => props.cancelAppointment(props.appointment._id)}>ОТМЕНИТЬ</button>
    }
  </div>
  );
}

export default AppointmentItem;