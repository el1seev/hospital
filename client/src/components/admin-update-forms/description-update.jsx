import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminUpdateOperations } from '../../api/admin-update';

const UpdateServiceDescription = (props) => {
  const [form , setForm] = useState({type: '', price: ''});
  const [currentService, setCurrentService] = useState(null);
  const [currentDescription, setCurrentDescription] = useState(null);
  
  const navigate = useNavigate();

  const setService = async (id) => {
    const selectedService = props.services.find((service) => service._id === id);
    setCurrentService(selectedService);
  }

  const setDescription = async (id) => {
    const selectedDescription = currentService.description.find((i) => i._id === id);
    console.log(selectedDescription)
    setCurrentDescription(selectedDescription);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminUpdateOperations({...form, id: currentService._id, type: currentDescription.type, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
      <select onChange={(e) => setService(e.target.value)} value={currentService ? currentService._id : ''}>
        <option value="" disabled>Выберите услугу из выпадающего списка</option>
        {props.services.map((service) => (
        <option key={service._id} value={service._id}>
        {service.name}
        </option>
      ))}
      </select>

      { currentService !== null && 
      (
        <select onChange={(e) => setDescription(e.target.value)} value={currentDescription ? currentDescription.type : ''}>
        <option value="" disabled>Выберите описание из выпадающего списка</option>
        {currentService.description.map((i) => (
        <option key={i._id} value={i._id}>
        {i.type}
        </option>
        ))}
        </select>
      )}
      {currentDescription !== null && (
            <>
                <label>Изменить тип (текущее: {currentDescription.type})
            <input onChange={changeHandler} type="text" id="type" name="type" placeholder="тип услуги"></input>
          </label>
          <label>Изменить цену (текущая: {currentDescription.price})
            <input onChange={changeHandler} type="text" id="price" name="price" placeholder="1.5"></input>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
            </>
          )}
          
    </form>
    </div>
  );
}

export default UpdateServiceDescription;