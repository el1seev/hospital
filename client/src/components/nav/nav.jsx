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
          <li className='list-child'><Link to='/services' className='nav-link'>Услуги</Link></li>
          <li className='list-child'><Link to='/employees' className='nav-link'>Сотрудники</Link></li>
          <li className='list-child'><Link to='/about-us' className='nav-link'>О нас</Link></li>
        </ul>

        <ul className='nav-tel'>
          <li className='tel-list'><p className='nav-tel-text'>Горячая линия:</p><span className='tel'>+375(29)xxx-xx-xx</span></li>
          <li className='tel-list'><p className='nav-tel-text'>Анонимный звонок:</p><span className='tel'>+375(29)xxx-xx-xx</span></li>
        </ul>

        <div className='profile-wrap'>
          {
            !props.user ?
            <Link className='entire-profile' to='/auth'>Вход</Link>
            :
              props.user.userType !== 'админ' ?
              <Link className='entire-profile' to={`/profile/${props.user.id}`}>{props.user.secondName}</Link>
              :
              <Link className='entire-profile' to={`/admin`}>{props.user.userType}</Link>
          }
        </div>


      <button className={!props.modalActive ? 'header-burger' : 'header-burger active'} onClick={props.setActive} >
        <span></span>
      </button>


    </div>
  );
}

export default Nav;