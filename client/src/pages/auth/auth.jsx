import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authenticate } from '../../api/auth';
import './auth.css';

const Auth = () => {
  const [form , setForm] = useState({
    passport: '', password: ''});
  const navigate = useNavigate();
  
  const submitAuth = async (event) => {
    event.preventDefault();
    const res = await authenticate({...form});
    if(res){
      localStorage.setItem('token', res.token);
      navigate('/', { replace: true });
      window.location.reload();
    } 
  };

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className='auth-page'>
      <div className='form-wrap'>
        <form className='form'>
          <label>Введите серию паспорта
            <input onChange={changeHandler} type='text' id='passport' name='passport' placeholder='AB0000000'></input>
          </label>
          <label>
            <input onChange={changeHandler} type='password' id='password' name='password' placeholder='Пароль'></input>
          </label>
          <button className='book-button' onClick={submitAuth}>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;