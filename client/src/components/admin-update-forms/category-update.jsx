import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { adminUpdateOperations } from '../../api/admin-update';

const UpdateCategory = (props) => {
  const [form , setForm] = useState({name: ''});
  const [currentCategory, setCurrentCategory] = useState(null);
  
  const navigate = useNavigate();

  const setCurrent = async (id) => {
    const selectedCategory = props.categories.find((category) => category._id === id);
    setCurrentCategory(selectedCategory);
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault();
    const res = await adminUpdateOperations({...form, id: currentCategory._id, operation: props.operation});
    if(res){
      navigate('/admin', { replace: true });
      window.location.reload();
    } 
  }

  return (
    <div className='form-wrap'>
    <form className='form'>
      <h1>{props.operation}</h1>
      <select onChange={(e) => setCurrent(e.target.value)} value={currentCategory ? currentCategory._id : ''}>
  <option value="" disabled>Выберите категорию из выпадающего списка</option>
  {props.categories.map((category) => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ))}
</select>
          {currentCategory !== null && (
            <>
                <label>Изменить название (текущее: {currentCategory.name})
            <input onChange={changeHandler} type="text" id="name" name="name" placeholder="1-я"></input>
          </label>
          <button className="book-button" onClick={submit}>Отправить</button>
            </>
          )}
          
    </form>
    </div>
  );
}

export default UpdateCategory;