import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSpecializations } from '../../redux/actions/actions';
import { fetchCategories } from '../../api/fetchData';
import { adminAddOperations } from '../../api/admin-add';

const AddEmployee = (props) => {
  const [form , setForm] = useState({passportId: '', firstName: '', secondName: '', middleName: '',
  categoryId: '', specializationId: '', dateOfBirth: '', shift: '', password: ''});
  const [categories, setCategories] = useState(null);
  const specializations = useSelector(state => state.specializations.specializations);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategories = async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminAddOperations({...form, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  useEffect(() => {
    if(specializations === undefined){
      dispatch(getSpecializations());
    }
    handleCategories();
  },[]);

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
      <label>Введите серию паспорта
            <input onChange={changeHandler} type="text" id="passportId" name="passportId" placeholder="AB0000000"></input>
          </label>
          <label>Введите имя
            <input onChange={changeHandler} type="text" id="firstName" name="firstName" placeholder="Сергей"></input>
          </label>
          <label>Введите фамилию
            <input onChange={changeHandler} type="text" id="secondName" name="secondName" placeholder="Елисеев"></input>
          </label>
          <label>Введите отчество
            <input onChange={changeHandler} type="text" id="middleName" name="middleName" placeholder="Геннадьевич"></input>
          </label>
          <label>Введите дату рождения в формате: ДД-ММ-ГГГГ
            <input onChange={changeHandler} type="text" id="dateOfBirth" name="dateOfBirth" placeholder="28-02-2000"></input>
          </label>
          <label>Выберите специализацию из выпадающего списка
            <input onChange={changeHandler} type="text" list='optionsSpec' id="specializationId" name="specializationId" placeholder='нажмите два раза'>
            </input>
              <datalist id='optionsSpec'>
                {
                  specializations.map( specialization => (
                    <option value={specialization._id} key={specialization._id}>{specialization.name}</option>
                  ))
                }
              </datalist>
          </label>
          <label>Выберите категорию
            <input onChange={changeHandler} type="text" list='optionsCategory' id="categoryId" name="categoryId" placeholder="высшая">
            </input>
              <datalist id='optionsCategory'>
                { categories !== null && categories.map( category => (
                  <option value={category._id} key={category._id}>{category.name}</option>
                ))}
              </datalist>
          </label>
          <label>Выберите смену
            <input onChange={changeHandler} type="text" list='optionsShift' id="shift" name="shift" placeholder="1-я">
            </input>
              <datalist id='optionsShift'>
                <option value='1-я'>1-я</option>
                <option value='2-я'>2-я</option>
              </datalist>
          </label>
          <label>Введите пароль
            <input onChange={changeHandler} type="password" id="password" name="password" placeholder="Пароль"></input>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
    </form>
    </div>
  );
}

export default AddEmployee;