import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEmployees, getSpecializations } from '../../redux/actions/actions';
import ReceptionTel from '../../components/reception-tel/reception-tel';
import DoctorLogo from '../../assets/svgs/doctor-logo';
import './book-appointment.css';
import createInitials from '../../helpers/createInitials';

const BookAppointment = () => {
  const specializations = useSelector(state => state.specializations.specializations);
  const employees = useSelector(state => state.employees.employees);
  const [filteredEmployees, setEmployees] = useState(null);
  
  const dispatch = useDispatch();

  const filterBySpecialization = async (specializationId) => {
    console.log(employees)
    const employeesBySpecialization = await employees.filter(( employee ) => {
      return employee.specializationId._id === specializationId;
    })
    setEmployees(employeesBySpecialization);
  }

  useEffect(() => {
    if(specializations.length === 0){
      dispatch(getSpecializations());
    }
    if(employees.length === 0){
      dispatch(getEmployees());
    }
  }, [])
  
  return (
    <div className='book-appointment-page'>
      <ReceptionTel/>
      {
        filteredEmployees !== null ?
        <div className='emlpoyees-wrap'>
        { filteredEmployees.map( employee => (
          <div className='doctor-wrap' key={employee._id}>
            <div className='doctor-container'>
              <div className='doctor-logo'> 
                <DoctorLogo/>
              </div>
              <div className='doctor-descriptions'>
                <p className='doctor-info'>{createInitials(employee.firstName, employee.secondName, employee.middleName)}</p>
                <p className='doctor-info'>{employee.specializationId.name}, {employee.shift} категория</p>
              </div>
              <Link to={`/employees/${employee._id}/appointments`} className='book-button'>Запись</Link>
            </div>
          </div>
        ))}
        </div>
        :
        <div className='specializations-wrap'>
        {
          specializations.map( specialization => (
            <div key={specialization._id} className='specialization-item' onClick={e => filterBySpecialization(specialization._id)}>
              <p className='specialization-name'>{specialization.name}</p>
            </div>
          ))
        }
        </div>
      }
    </div>
  );
}

export default BookAppointment;