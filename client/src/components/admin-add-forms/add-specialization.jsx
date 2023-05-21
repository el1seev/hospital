import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminAddOperations } from '../../api/admin-add';

const AddSpecialization = (props) => {
  const [form , setForm] = useState({name: ''});

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
      <label>Введите название
                <input onChange={changeHandler} type="text" id="name" name="name" placeholder="название"></input>
              </label>
          <button className="book-button" onClick={submit}>Отправить</button>
    </form>
    </div>
  );
}

export default AddSpecialization;