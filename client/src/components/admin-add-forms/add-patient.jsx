import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminAddOperations } from '../../api/admin-add';

const AddPatient = (props) => {
  const [form , setForm] = useState({ passport: '', firstName: '', secondName: '', middleName: '', phone: '',
    address: '',dateOfBirth: '', gender: '', password: ''});

  const navigate = useNavigate();


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

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
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
          <label>Введите дату рождения в формате: ДД-ММ-ГГГГ
            <input onChange={changeHandler} type="text" id="dateOfBirth" name="dateOfBirth" placeholder="28-02-2000"></input>
          </label>
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
          <label>Введите пароль
            <input onChange={changeHandler} type="password" id="password" name="password" placeholder="Пароль"></input>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
    </form>
    </div>
  );
}

export default AddPatient;