import { Link } from 'react-router-dom';

import MainLogo from '../../assets/svgs/main-logo';
import './nav.css';

const Nav = (props) => {

  return (
    <div className='nav'>
      <div className='logo'>
        <MainLogo/>
      </div>


        <ul className='nav-list'>
          <li className='list-child'><Link to='/home' className='nav-link'>Главная</Link></li>
          <li className='list-child'><Link to='/book-appointment' className='nav-link'>Запись на приём</Link></li>
          <li className='list-child'><Link to='/service' className='nav-link'>Услуги</Link></li>
          <li className='list-child'><Link to='/employees' className='nav-link'>Сотрудники</Link></li>
          <li className='list-child'><Link to='/about-us' className='nav-link'>О нас</Link></li>
        </ul>

        <ul className='nav-tel'>
          <li className='tel-list'><p className='nav-tel-text'>Горячая линия:</p><span className='tel'>+375(29)xxx-xx-xx</span></li>
          <li className='tel-list'><p className='nav-tel-text'>Анонимный звонок:</p><span className='tel'>+375(29)xxx-xx-xx</span></li>
        </ul>

        <div className='profile-wrap'>
          <Link className='entire-profile'>Вход</Link>
        </div>


      <div className={!props.modalActive ? 'header-burger' : 'header-burger active'} onClick={props.setActive} >
        <span></span>
      </div>


    </div>
  );
}

export default Nav;