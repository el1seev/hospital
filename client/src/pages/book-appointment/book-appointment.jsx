import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEmployees, getSpecializations } from '../../redux/actions/actions';
import ReceptionTel from '../../components/reception-tel/reception-tel';
import DoctorLogo from '../../assets/svgs/doctor-logo';
import './book-appointment.css';
import createInitials from '../../helpers/createInitials';

const BookAppointment = (props) => {
  const specializations = useSelector(state => state.specializations.specializations);
  const employees = useSelector(state => state.employees.employees);
  const [filteredEmployees, setEmployees] = useState(null);
  
  const dispatch = useDispatch();

  const filterBySpecialization = async (specializationId) => {
    const employeesBySpecialization = await employees.filter(( employee ) => {
      return employee.specializationId._id === specializationId;
    });
    setEmployees(employeesBySpecialization);
  };

  useEffect(() => {
    if(specializations.length === 0){
      dispatch(getSpecializations());
    }
    if(employees.length === 0){
      dispatch(getEmployees());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='book-appointment-page' style={props.backgroundStyle}>
      <ReceptionTel back={props.backgroundStyle} txt={props.text}/>
      {
        filteredEmployees !== null ?
          <div className='emlpoyees-wrap'>
            { filteredEmployees.map( employee => (
              <div className='doctor-wrap' key={employee._id}>
                <div className={props.backgroundStyle !== null ? `doctor-container_${props.backgroundStyle.backgroundColor}` : 'doctor-container'}>
                  {
                    props.backgroundStyle === null && (<div className='doctor-logo'><DoctorLogo/></div>)
                  }
                  <div className='doctor-descriptions' style={props.backgroundStyle}>
                    <p className={'doctor-info'} style={props.text}>
                      {createInitials(employee.firstName, employee.secondName, employee.middleName) }</p>
                    <p className={'doctor-info'} style={props.text}>{employee.specializationId.name}, {employee.shift} категория</p>
                  </div>
                  <Link to={`/employees/${employee._id}/appointments`} style={props.text} 
                    className={props.backgroundStyle !== null ? `book-button_${props.backgroundStyle.backgroundColor}` : 'book-button'}
                  >
                  Запись
                  </Link>
                </div>
              </div>
            ))}
          </div>
          :
          <div className='specializations-wrap'>
            {
              specializations.map( specialization => (
                <div key={specialization._id} className={ props.backgroundStyle ?
                  `specialization-item_${props.backgroundStyle.backgroundColor}` : 'specialization-item'}
                onClick={e => filterBySpecialization(specialization._id)}>
                  <p className='specialization-name' style={props.text}>{specialization.name}</p>
                </div>
              ))
            }
          </div>
      }
    </div>
  );
};

export default BookAppointment;