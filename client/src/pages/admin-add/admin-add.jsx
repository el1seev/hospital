import { useState } from 'react';

import AddEmployee from '../../components/admin-add-forms/add_employee';
import AddPatient from '../../components/admin-add-forms/add-patient';
import AddCategory from '../../components/admin-add-forms/add-category';
import AddSpecialization from '../../components/admin-add-forms/add-specialization';
import AddService from '../../components/admin-add-forms/add-service';
import AddServiceDescription from '../../components/admin-add-forms/add-service-description';
import './admin-add.css';

const AdminAdd = () => {

  const [operation, setOperation] = useState('добавить врача');
  
  const setAdminOperation = (value) => {
    setOperation(value);
  }


  return (
    <div className="admin-add-page">
      <div className="admin-nav">
        <ul className='nav-list'>
          {['добавить врача', 'добавить пациента', 'добавить услугу', 'добавить описание услуги', 
          'добавить специализацию', 'добавить категорию'].map( (value) => 
          (<li className='list-child'><button className='nav-link' onClick={e => setAdminOperation(value)}>{value}</button></li>))
          }
        </ul>
      </div>

      {operation === 'добавить врача' && (<AddEmployee operation={operation}/>)}
      {operation === 'добавить пациента' && (<AddPatient operation={operation}/>)}
      {operation === 'добавить категорию' && (<AddCategory operation={operation}/>)}
      {operation === 'добавить специализацию' && (<AddSpecialization operation={operation}/>)}
      {operation === 'добавить услугу' && (<AddService operation={operation}/>)}
      {operation === 'добавить описание услуги' && (<AddServiceDescription operation={operation}/>)}
    </div>
  );
}

export default AdminAdd;