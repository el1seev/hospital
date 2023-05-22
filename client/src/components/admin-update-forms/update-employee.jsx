import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEmployees, getSpecializations } from '../../redux/actions/actions';
import { fetchCategories } from '../../api/fetchData';
import createInitials from '../../helpers/createInitials';
import { adminUpdateOperations } from '../../api/admin-update';

const UpdateEmployee = (props) => {
  const [form , setForm] = useState({
    passportId: '', firstName: '', secondName: '', middleName: '', specialization: '',
    category: '', shift: ''});
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [categories, setCategories] = useState(null);
  const specializations = useSelector(state => state.specializations.specializations);
  const employees = useSelector(state => state.employees.employees);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategories = async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  }

  const setCurrent = async (id) => {
    const selectedEmployee = employees.find((employee) => employee._id === id);
    setCurrentEmployee(selectedEmployee);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminUpdateOperations({...form, id: currentEmployee._id, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  useEffect(() => {
    handleCategories();
    if(specializations.length === 0){
      dispatch(getSpecializations());
    }
    if(employees.length === 0){
      dispatch(getEmployees());
    }
  },[]);

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
      <select onChange={(e) => setCurrent(e.target.value)} value={currentEmployee ? currentEmployee._id : ''}>
  <option value="" disabled>Выберите врача из выпадающего списка</option>
  {employees.map((employee) => (
    <option key={employee._id} value={employee._id}>
      {createInitials(employee.secondName, employee.firstName, employee.middleName)}
    </option>
  ))}
</select>
          {currentEmployee !== null && (
            <>
                <label>Изменить серию паспорта(текущий: {currentEmployee.passportId})
            <input onChange={changeHandler} type="text" id="passportId" name="passportId" placeholder="AB0000000"></input>
          </label>
          <label>Изменить имя (текущее: {currentEmployee.firstName})
            <input onChange={changeHandler} type="text" id="firstName" name="firstName" placeholder="Сергей"></input>
          </label>
          <label>Изменить фамилию (текущее: {currentEmployee.secondName})
            <input onChange={changeHandler} type="text" id="secondName" name="secondName" placeholder="Елисеев"></input>
          </label>
          <label>Изменить отчество (текущее: {currentEmployee.middleName})
            <input onChange={changeHandler} type="text" id="middleName" name="middleName" placeholder="Геннадьевич"></input>
          </label>
          <label>Изменить специализацию из выпадающего списка (текущая: {currentEmployee.specialization.name})
            <input onChange={changeHandler} type="text" list='optionsSpec' id="specialization" name="specialization" placeholder='нажмите два раза'>
            </input>
              <datalist id='optionsSpec'>
                {
                  specializations.map( specialization => (
                    <option value={specialization._id} key={specialization._id}>{specialization.name}</option>
                  ))
                }
              </datalist>
          </label>
          <label>Изменить категорию(текущая: {currentEmployee.category.name})
            <input onChange={changeHandler} type="text" list='optionsCategory' id="shift" name="shift" placeholder="1-я">
            </input>
              <datalist id='optionsCategory'>
                { categories !== null && categories.map( category => (
                  <option value={category._id} key={category._id}>{category.name}</option>
                ))}
              </datalist>
          </label>
          <label>Изменить смену(текущая: {currentEmployee.shift})
            <input onChange={changeHandler} type="text" list='optionsShift' id="shift" name="shift" placeholder="1-я">
            </input>
              <datalist id='optionsShift'>
                <option value='1-я'>1-я</option>
                <option value='2-я'>2-я</option>
              </datalist>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
            </>
          )}
          
    </form>
    </div>
  );
}

export default UpdateEmployee;