import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminAddOperations } from '../../api/admin-add';

const AddService = (props) => {
  const [form , setForm] = useState({name: '', image: '', type: '', price: ''});

  const navigate = useNavigate();


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminAddOperations({...form, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  };

  return (
    <div className='form-wrap'>
      <form className='form'>
        <h1>{props.operation}</h1>
        <label>Введите название
          <input onChange={changeHandler} type='text' id='name' name='name' placeholder='название'></input>
        </label>
        <label>Введите URL изображения
          <input onChange={changeHandler} type='text' id='image' name='image' placeholder='URL'></input>
        </label>
        <label>Введите тип услуги
          <input onChange={changeHandler} type='text' id='type' name='type' placeholder='тип услуги'></input>
        </label>
        <label>Введите цену услуги
          <input onChange={changeHandler} type='text' id='price' name='price' placeholder='1.5'></input>
        </label>
        <button className='book-button' onClick={submit}>Отправить</button>
      </form>
    </div>
  );
};

export default AddService;