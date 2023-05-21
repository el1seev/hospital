import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEmployees, getSpecializations } from '../../redux/actions/actions';
import ReceptionTel from '../../components/reception-tel/reception-tel';
import DoctorLogo from '../../assets/svgs/doctor-logo';
import './book-appointment.css';

const BookAppointment = () => {
  const specializations = useSelector(state => state.specializations.specializations);
  const employees = useSelector(state => state.employees.employees);
  const [filteredEmployees, setEmployees] = useState(null);
  const dispatch = useDispatch();

  const handleSpecializations = async () => {
    dispatch(getSpecializations());
  }

  const filterBySpecialization = async (specializationId) => {
    console.log(employees)
    const employeesBySpecialization = await employees.filter(( employee ) => {
      return employee.specialization._id === specializationId;
    })
    setEmployees(employeesBySpecialization);
  }

  useEffect(() => {
    handleSpecializations();
    if(!employees){
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
                <p className='doctor-info'>{employee.firstName}</p>
                <p className='doctor-info'>{employee.specialization.name}, {employee.shift} категория</p>
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