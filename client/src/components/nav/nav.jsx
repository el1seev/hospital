import { Link } from 'react-router-dom';

import MainLogo from '../../assets/svgs/main-logo';
import './nav.css';

const Nav = (props) => {

  return (
    <div className={props.text === null ? 'nav' : `nav_${props.text.color}`} style={props.backgroundStyle}>
      <div className='logo'>
        <MainLogo color={props.text !== null ? props.text.color : null} back={props.backgroundStyle}/>
      </div>


      <ul className='nav-list'>
        <li className='list-child'>
          <Link to='/home' className='nav-link' style={props.text}>
          Главная
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/book-appointment' className='nav-link' style={props.text}>
            Запись на приём
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/services' className='nav-link' style={props.text}>
          Услуги
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/employees' className='nav-link' style={props.text}>
          Сотрудники
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/about-us' className='nav-link' style={props.text}>
          О нас
          </Link>
        </li>
      </ul>

      <ul className='nav-tel'>
        <li className='tel-list'><p className='nav-tel-text' style={props.text}>
          Горячая линия:
        </p><span className='tel' style={props.text}>+375(29)xxx-xx-xx</span>
        </li>
        <li className='tel-list'><p className='nav-tel-text' style={props.text}>
          Анонимный звонок:</p><span className='tel' style={props.text}>
          +375(29)xxx-xx-xx</span>
        </li>
      </ul>

      <div className='profile-wrap'>
        {
          !props.user ?
            <Link className='entire-profile' to='/auth' style={props.text}>Вход</Link>
            :
            props.user.userType !== 'админ' ?
              <Link className='entire-profile' style={props.text}
                to={`/profile/${props.user.id}`}>{props.user.secondName}
              </Link>
              :
              <Link className='entire-profile' style={props.text}
                to={'/admin'}>{props.user.userType}
              </Link>
        }
      </div>


      <button className={!props.modalActive ?  props.text === null
        ? 'header-burger' : `header-burger_${props.text.color}` :  props.text === null
        ? 'header-burger active': `header-burger_${props.text.color} active`} onClick={props.setActive} >
        <span></span>
      </button>


    </div>
  );
};

export default Nav;