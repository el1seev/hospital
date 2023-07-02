import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import UpdateEmployee from '../../components/admin-update-forms/update-employee';
import UpdatePatient from '../../components/admin-update-forms/update-patient';
import { fetchAllPatients, fetchCategories } from '../../api/fetchData';
import { getServices, getSpecializations } from '../../redux/actions/actions';
import UpdateService from '../../components/admin-update-forms/service-update';
import UpdateSpecialization from '../../components/admin-update-forms/specialization-update';
import UpdateCategory from '../../components/admin-update-forms/category-update';
import UpdateServiceDescription from '../../components/admin-update-forms/description-update';


const AdminUpdate = (props) => {

  const [operation, setOperation] = useState('изменить врача');
  const [patients, setPatients] = useState(null);
  const [categories, setCategories] = useState(null);
  const specializations = useSelector(state => state.specializations.specializations);
  const services = useSelector(state => state.services.services);

  const dispatch = useDispatch();

  const handlePatients = async () => {
    const patients = await fetchAllPatients();
    setPatients(patients);
  };

  const handleCategories = async () => {
    const categories = await fetchCategories();
    setCategories(categories); 
  };

  const setAdminOperation = (value) => {
    setOperation(value);
  };

  useEffect(() => {
    if(specializations.length === 0){
      dispatch(getSpecializations());
    }
    if(services.length === 0){
      dispatch(getServices());
    }
    handleCategories();
    handlePatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='admin-add-page'>
      <div className='admin-nav'>
        <ul className='nav-list'>
          {['изменить врача', 'изменить пациента', 'изменить услугу', 'изменить описание услуги', 
            'изменить специализацию', 'изменить категорию'].map( (value) => 
            (<li className='list-child'>
              <button className='nav-link' onClick={e => setAdminOperation(value)}>
                {value}
              </button>
            </li>))
          }
        </ul>
      </div>

      {operation === 'изменить врача' && (<UpdateEmployee operation={operation}/>)}
      {operation === 'изменить пациента' && (<UpdatePatient operation={operation} patients={patients}/>)}
      {operation === 'изменить услугу' && (<UpdateService operation={operation} services={services}/>)}
      {operation === 'изменить описание услуги' && (<UpdateServiceDescription operation={operation} services={services}/>)}
      {operation === 'изменить специализацию' && (<UpdateSpecialization operation={operation} specializations={specializations}/>)}
      {operation === 'изменить категорию' && (<UpdateCategory operation={operation} categories={categories}/>)}
    </div>
  );
};

export default AdminUpdate;