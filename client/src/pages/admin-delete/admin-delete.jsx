import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getEmployees, getServices, getSpecializations } from '../../redux/actions/actions';
import { fetchAllPatients, fetchCategories } from '../../api/fetchData';
import UserDelete from '../../components/admin-delete-forms/user-delete';
import DataDelete from '../../components/admin-delete-forms/data-delete';
import './admin-delete.css';

const AdminDelete = () => {
  const [list, setList] = useState(null);
  const [categories, setCategories] = useState(null);
  const [patients, setPatients] = useState(null);
  const [operation, setOperation] = useState('удалить врача');
  const employees = useSelector(state => state.employees.employees);
  const specializations = useSelector(state => state.specializations.specializations);
  const services = useSelector(state => state.services.services);

  const dispatch = useDispatch();

  const handleCategories = async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  };

  const handlePatients = async () => {
    const patients = await fetchAllPatients();
    setPatients(patients);
  };

  const setAdminOperation = (value) => {
    setOperation(value);
    switch(value){
    case 'удалить врача':
      setList(employees);
      break;
    case 'удалить пациента':
      setList(patients);
      break;
    case 'удалить услугу':
      setList(services);
      break;
    case 'удалить специализацию':
      setList(specializations);
      break;
    case 'удалить категорию':
      setList(categories);
      break;
    default:
      setList(employees);
      break;
    }
  };

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getServices());
    handleCategories();
    dispatch(getEmployees());
    handlePatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className='admin-add-page'>
      <div className='admin-nav'>
        <ul className='nav-list'>
          {['удалить врача', 'удалить пациента', 'удалить услугу', 'удалить специализацию', 'удалить категорию'].map(
            (value) => (
              <li className='list-child'><button className='nav-link' onClick={e => setAdminOperation(value)}>
                {value}</button>
              </li>
            ))
          }
        </ul>
      </div>

      {operation !== 'удалить услугу' && operation !== 'удалить специализацию' && operation !== 'удалить категорию'
      && (<UserDelete list={list} operation={operation}/>)}
      {operation !== 'удалить врача' && operation !== 'удалить пациента' && (<DataDelete  list={list} operation={operation}/>)}
    </div>
  );
};

export default AdminDelete;