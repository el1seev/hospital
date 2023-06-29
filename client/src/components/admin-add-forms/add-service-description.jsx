import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { adminAddOperations } from '../../api/admin-add';
import { getServices } from '../../redux/actions/actions';

const AddServiceDescription = (props) => {
  const [form , setForm] = useState({name: '', image: '', type: '', price: ''});
  const services = useSelector(state => state.services.services);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getServices());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className='form-wrap'>
      <form className='form'>
        <h1>{props.operation}</h1>
        <label>Введите название
          <input onChange={changeHandler} type='text' list='optionsServiceName' id='name' name='name' placeholder='название'></input>
          <datalist id='optionsServiceName'>
            {
              services.map(service => (
                <option value={service._id} key={service._id}>{service.name}</option>
              ))
            }
          </datalist>
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

export default AddServiceDescription;