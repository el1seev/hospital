import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEmployees } from '../../redux/actions/actions';
import DoctorLogo from '../../assets/svgs/doctor-logo';
import ReceptionTel from '../../components/reception-tel/reception-tel';
import './employees.css';

const Employees = () => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  const handleEmployees = async () => {
    dispatch(getEmployees());
  }
  useEffect(() => {
    handleEmployees();
  }, []);

  return(
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
              <p className='doctor-info'>{employee.firstName}</p>
              <p className='doctor-info'>{employee.specialization.name}, {employee.shift} категория</p>
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