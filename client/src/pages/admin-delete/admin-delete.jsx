import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEmployees, getServices, getSpecializations } from '../../redux/actions/actions';
import { adminDeleteOperations } from '../../api/admin-delete';
import { fetchAllPatients, fetchCategories } from '../../api/fetchData';
import './admin-delete.css';

const AdminDelete = () => {
  const [form , setForm] = useState({ name: ''});
  const [list, setList] = useState(null);
  const [categories, setCategories] = useState(null);
  const [patients, setPatients] = useState(null);
  const [operation, setOperation] = useState('удалить врача');
  const employees = useSelector(state => state.employees.employees);
  const specializations = useSelector(state => state.specializations.specializations);
  const services = useSelector(state => state.services.services);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategories = async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  }

  const handlePatients = async () => {
    const patients = await fetchAllPatients();
    setPatients(patients);
  }
  
  const submit = async (event) => {
    event.preventDefault();
    const res = await adminDeleteOperations({...form, operation: operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  const setAdminOperation = (value) => {
    setOperation(value);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getServices());
    dispatch(getEmployees());
    handleCategories();
    handlePatients();
  },[]);

  useEffect(() => {
    switch(operation){
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
  }, [operation])

  return (
    <div className="admin-add-page">
      <div className="admin-nav">
        <ul className='nav-list'>
          {['удалить врача', 'удалить пациента', 'удалить услугу', 'удалить специализацию', 'удалить категорию'].map( (value) => (<li className='list-child'><button className='nav-link' onClick={e => setAdminOperation(value)}>{value}</button></li>))}
        </ul>
      </div>

      <div className='form-wrap'>
        <form className='form'>
          <h1>{operation}</h1>
          <label>Введите название
            <input onChange={changeHandler} type="text" list='options' id="name" name="name" placeholder="название"></input>
              <datalist id='options'>
                {
                list !== null && list.map( i => (
                  <option value={i._id} key={i._id}>{i.name}{i.passportId}</option>
                ))
                }
              </datalist>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
        </form>
      </div>
    </div>
  );
}

export default AdminDelete;