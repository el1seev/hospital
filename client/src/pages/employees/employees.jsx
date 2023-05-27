import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEmployees } from '../../redux/actions/actions';
import DoctorLogo from '../../assets/svgs/doctor-logo';
import ReceptionTel from '../../components/reception-tel/reception-tel';
import createInitials from '../../helpers/createInitials';
import './employees.css';

const Employees = () => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <div className='employees-page'>
      <ReceptionTel/>
      <div className='emlpoyees-wrap'>
      { employees.map( employee => (
        <div className='doctor-wrap' key={employee._id}>
          <div className='doctor-container'>
            <div className='doctor-logo'> 
              <DoctorLogo/>
            </div>
            <div className='doctor-descriptions'>
              <p className='doctor-info'>{createInitials(employee.firstName, employee.secondName, employee.middleName) }</p>
              <p className='doctor-info'>{employee.specializationId.name}, {employee.shift} категория</p>
            </div>
            <Link to={`/employees/${employee._id}/appointments`} className='book-button'>Запись</Link>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}


export default Employees;