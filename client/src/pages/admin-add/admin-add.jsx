import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getServices, getSpecializations } from '../../redux/actions/actions';
import { adminAddOperations } from '../../api/admin-add';
import { fetchCategories } from '../../api/fetchData';
import './admin-add.css';

const AdminAdd = () => {
  const [form , setForm] = useState({
    passport: '', gender: '', firstName: '', secondName: '', middleName: '', specialization: '',
    category: '', dateOfBirth: '', address: '', phone: '', shift: '', password: '', name: '', image: '', type: '', price: ''
  });
  const [categories, setCategories] = useState(null);
  const specializations = useSelector(state => state.specializations.specializations);
  const services = useSelector(state => state.services.services);
  const [operation, setOperation] = useState('добавить врача');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategories = async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  }
  
  const submit = async (event) => {
    event.preventDefault();
    const res = await adminAddOperations({...form, operation: operation});
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
    handleCategories();
  },[]);

  return (
    <div className="admin-add-page">
      <div className="admin-nav">
        <ul className='nav-list'>
          {['добавить врача', 'добавить пациента', 'добавить услугу', 'добавить описание услуги','добавить специализацию', 'добавить категорию'].map( (value) => (<li className='list-child'><button className='nav-link' onClick={e => setAdminOperation(value)}>{value}</button></li>))}
        </ul>
      </div>

      <div className='form-wrap'>
        <form className='form'>
          <h1>{operation}</h1>
          { operation === 'добавить услугу' || operation === 'добавить специализацию' || operation === 'добавить категорию'
            || operation === 'добавить описание услуги'
            ?
            <>
            { operation === 'добавить услугу' ?
              <>
              <label>Введите название
                <input onChange={changeHandler} type="text" id="name" name="name" placeholder="название"></input>
              </label>
              <label>Введите URL изображения
                <input onChange={changeHandler} type="text" id="image" name="image" placeholder="URL"></input>
              </label>
              <label>Введите тип услуги
                <input onChange={changeHandler} type="text" id="type" name="type" placeholder="тип услуги"></input>
              </label>
              <label>Введите цену услуги
                <input onChange={changeHandler} type="text" id="price" name="price" placeholder="1.5"></input>
              </label>
              </>
              :
              operation === 'добавить описание услуги' && (
                <>
                <label>Введите название
                  <input onChange={changeHandler} type="text" list='optionsServiceName' id="name" name="name" placeholder="название"></input>
                  <datalist id='optionsServiceName'>
                  {
                    services.map(service => (
                      <option value={service._id} key={service._id}>{service.name}</option>
                    ))
                  }
                  </datalist>
                </label>
                <label>Введите тип услуги
                  <input onChange={changeHandler} type="text" id="type" name="type" placeholder="тип услуги"></input>
                </label>
                <label>Введите цену услуги
                  <input onChange={changeHandler} type="text" id="price" name="price" placeholder="1.5"></input>
                </label>
                </>
            )}
            </>

          :
          <>
          <label>Введите серию паспорта
            <input onChange={changeHandler} type="text" id="passport" name="passport" placeholder="AB0000000"></input>
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
          { operation === 'добавить врача' && (
            <>
            <label>Выберите специализацию из выпадающего списка
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
          <label>Выберите категорию
            <input onChange={changeHandler} type="text" list='optionsCategory' id="shift" name="shift" placeholder="1-я">
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
          </>
          )
          }
          { operation === 'добавить пациента' && (
          <>
          <label>Выберите пол
            <input onChange={changeHandler} type="text" list='optionsGender' id="gender" name="gender" placeholder="М">
            </input>
              <datalist id='optionsGender'>
                <option value='М'>Мужской</option>
                <option value='Ж'>Женский</option>
              </datalist>
          </label>
          <label>Введите адрес в формате: ул. Пушкина, дом 3, кв. 5
            <input onChange={changeHandler} type="text" id="address" name="address" placeholder="ул. 9 мая, 10, кв. 5"></input>
          </label>
          <label>Введите номер телефона
            <input onChange={changeHandler} type="text" id="phone" name="phone" placeholder="+375291111111"></input>
          </label>
          </>
          )
          }
          
          <label>Введите дату рождения в формате: ДД-ММ-ГГГГ
            <input onChange={changeHandler} type="text" id="dateOfBirth" name="dateOfBirth" placeholder="28-02-2000"></input>
          </label>
          <label>Введите пароль
            <input onChange={changeHandler} type="password" id="password" name="password" placeholder="Пароль"></input>
          </label>
          </>
          }
          <button className="book-button" onClick={submit}>Отправить</button>
        </form>
      </div>
    </div>
  );
}

export default AdminAdd;