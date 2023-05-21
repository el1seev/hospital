import { Link} from 'react-router-dom';

import './admin-profile.css';

const Admin = () => {

  return (
    <div className='admin-page'>
      <ul className='main-nav'>
        <li><Link to='/admin/add' className='main-nav-li'>Добавить</Link></li>
        <li><Link to='/admin/delete' className='main-nav-li'>Удалить</Link></li>
      </ul>
    </div>
  );
} 

export default Admin;