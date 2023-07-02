import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authenticate } from '../../api/auth';
import './auth.css';

const Auth = (props) => {
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
    <div className='auth-page' style={props.backgroundStyle}>
      <div className={props.backgroundStyle ? `form-wrap_${props.backgroundStyle.backgroundColor}` : 'form-wrap'}>
        <form className={props.backgroundStyle ? `form_${props.backgroundStyle.backgroundColor}` : 'form'}>
          <label style={props.text}>Введите серию паспорта
            <input onChange={changeHandler} type='text' id='passport' name='passport' placeholder='AB0000000'
              style={props.text ? {...props.text, border: `2px solid ${props.text.color}`} : null}
            >
            </input>
          </label>
          <label style={props.text}>
            <input onChange={changeHandler} type='password' id='password' name='password' placeholder='Пароль'
              style={props.text ? {...props.text, border: `2px solid ${props.text.color}`} : null}
            >
            </input>
          </label>

          <button className={props.backgroundStyle ? `book-button_${props.backgroundStyle.backgroundColor}` : 'book-button'}
            onClick={submitAuth} style={props.text}
          >Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;