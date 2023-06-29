import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEmployees } from '../../redux/actions/actions';
import DoctorLogo from '../../assets/svgs/doctor-logo';
import ReceptionTel from '../../components/reception-tel/reception-tel';
import createInitials from '../../helpers/createInitials';
import './employees.css';

const Employees = (props) => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='employees-page' style={props.backgroundStyle}>
      <ReceptionTel back={props.backgroundStyle} txt={props.text}/>
      <div className='emlpoyees-wrap'>
        { employees.map( employee => (
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
    </div>
  );
};


export default Employees;