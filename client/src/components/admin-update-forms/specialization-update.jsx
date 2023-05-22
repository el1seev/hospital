import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminUpdateOperations } from '../../api/admin-update';

const UpdateSpecialization = (props) => {
  const [form , setForm] = useState({name: ''});
  const [currentSpecialization, setCurrentSpecialization] = useState(null);
  
  const navigate = useNavigate();

  const setCurrent = async (id) => {
    const selectedSpecialization = props.specializations.find((specialization) => specialization._id === id);
    setCurrentSpecialization(selectedSpecialization);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminUpdateOperations({...form, id: currentSpecialization._id, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
      <select onChange={(e) => setCurrent(e.target.value)} value={currentSpecialization ? currentSpecialization._id : ''}>
  <option value="" disabled>Выберите специализацию из выпадающего списка</option>
  {props.specializations.map((specialization) => (
    <option key={specialization._id} value={specialization._id}>
      {specialization.name}
    </option>
  ))}
</select>
          {currentSpecialization !== null && (
            <>
                <label>Изменить название (текущее: {currentSpecialization.name})
            <input onChange={changeHandler} type="text" id="name" name="name" placeholder="хирург"></input>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
            </>
          )}
          
    </form>
    </div>
  );
}

export default UpdateSpecialization;