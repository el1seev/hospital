import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminDeleteOperations } from '../../api/admin-delete';

const DataDelete = (props) => {
  const [form , setForm] = useState({ name: ''});

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminDeleteOperations({...form, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  };

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className='form-wrap'>
      <form className='form'>
        <h1>{props.operation}</h1>
        <label>Выберите по названию
          <input onChange={changeHandler} type='text' list='options' id='name' name='name' placeholder='название'></input>
          <datalist id='options'>
            {
              props.list !== null && props.list.map( i => (
                <option value={i._id} key={i._id}>{i.name}{i.passportId}</option>
              ))
            }
          </datalist>
        </label>
        <button className='book-button' onClick={submit}>Отправить</button>
      </form>
    </div>
  );
};

export default DataDelete;