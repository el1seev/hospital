import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import createInitials from '../../helpers/createInitials';
import { adminUpdateOperations } from '../../api/admin-update';

const UpdatePatient = (props) => {
  const [form , setForm] = useState({
    passportId: '', firstName: '', secondName: '', middleName: '',
    address: '', phone: ''});
  const [currentPatient, setCurrentPatient] = useState(null);
  
  const navigate = useNavigate();

  const setCurrent = async (id) => {
    const selectedPatient = props.patients.find((patient) => patient._id === id);
    setCurrentPatient(selectedPatient);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminUpdateOperations({...form, id: currentPatient._id, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
      <select onChange={(e) => setCurrent(e.target.value)} value={currentPatient ? currentPatient._id : ''}>
  <option value="" disabled>Выберите пациента из выпадающего списка</option>
  {props.patients.map((patient) => (
    <option key={patient._id} value={patient._id}>
      {createInitials(patient.secondName, patient.firstName, patient.middleName)}
    </option>
  ))}
</select>
          {currentPatient !== null && (
            <>
                <label>Изменить серию паспорта(текущий: {currentPatient.passportId})
            <input onChange={changeHandler} type="text" id="passportId" name="passportId" placeholder="AB0000000"></input>
          </label>
          <label>Изменить имя (текущее: {currentPatient.firstName})
            <input onChange={changeHandler} type="text" id="firstName" name="firstName" placeholder="Сергей"></input>
          </label>
          <label>Изменить фамилию (текущее: {currentPatient.secondName})
            <input onChange={changeHandler} type="text" id="secondName" name="secondName" placeholder="Елисеев"></input>
          </label>
          <label>Изменить отчество (текущее: {currentPatient.middleName})
            <input onChange={changeHandler} type="text" id="middleName" name="middleName" placeholder="Геннадьевич"></input>
          </label>
          <label>Изменить адрес (текущий: {currentPatient.address})
            <input onChange={changeHandler} type="text" id="address" name="address" placeholder="ул. 9 мая, д.5, кв.3"></input>
          </label>
          <label>Изменить телефон (текущий: {currentPatient.phone})
            <input onChange={changeHandler} type="text" id="phone" name="phone" placeholder="+375292318787"></input>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
            </>
          )}
          
    </form>
    </div>
  );
}

export default UpdatePatient;