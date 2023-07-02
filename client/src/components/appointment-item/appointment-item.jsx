import createInitials from '../../helpers/createInitials';
import convertDate from '../../helpers/convertDate';
import './appointment-item.css';

const AppointmentItem = (props) => {
  return (
    <div className={props.back !== null ? `appintment-item_${props.back.backgroundColor}` : 'appointment-item'}>
      <p className='appointment-info' style={{textTransform: 'uppercase', ...props.txt}}>
        {createInitials(props.appointment.doctorId.secondName, props.appointment.doctorId.firstName, props.appointment.doctorId.middleName)}
      </p>
      <p className='appointment-info' style={props.txt}>{props.appointment.doctorId.specializationId.name}</p>
      <p className='appointment-info' style={props.txt}>{convertDate(props.appointment.dateTime)}</p>
      {
        props.appointment.status !== 'занят' ?
          <button className={props.back !== null?
            `appointment-button_${props.back.backgroundColor}` : 'appointment-button'}
          onClick={e => props.setActive(props.appointment._id)} style={props.txt}
          >
          ЗАПИСЬ
          </button>
          :
          <button className={props.back !== null ?
            `appointment-button_${props.back.backgroundColor}` : 'appointment-button'}
          onClick={e => props.setActive(props.appointment._id)} style={props.txt}
          >
          ОТМЕНИТЬ
          </button>
      }
    </div>
  );
};

export default AppointmentItem;