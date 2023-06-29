import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminUpdateOperations } from '../../api/admin-update';

const UpdateService = (props) => {
  const [form , setForm] = useState({name: '', image: ''});
  const [currentService, setCurrentService] = useState(null);
  
  const navigate = useNavigate();

  const setCurrent = async (id) => {
    const selectedService = props.services.find((service) => service._id === id);
    setCurrentService(selectedService);
  };

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminUpdateOperations({...form, id: currentService._id, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  };

  return (
    <div className='form-wrap'>
      <form className='form'>
        <h1>{props.operation}</h1>
        <select onChange={(e) => setCurrent(e.target.value)} value={currentService ? currentService._id : ''}>
          <option value='' disabled>Выберите услугу из выпадающего списка</option>
          {props.services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
        {currentService !== null && (
          <>
            <label>Изменить название (текущее: {currentService.name})
              <input onChange={changeHandler} type='text' id='name' name='name' placeholder='услуга'></input>
            </label>
            <label>Изменить изображение
              <input onChange={changeHandler} type='text' id='image' name='image' placeholder='URL'></input>
            </label>
            <button className='book-button' onClick={submit}>Отправить</button>
          </>
        )}
          
      </form>
    </div>
  );
};

export default UpdateService;