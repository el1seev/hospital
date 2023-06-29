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
          <Link to='/home' className={props.text === null ? 'nav-link' : `nav-link_${props.text.color}`} tabIndex={2}>
          Главная
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/book-appointment' className={props.text === null ? 'nav-link' : `nav-link_${props.text.color}`} tabIndex={3}>
            Запись на приём
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/services' className={props.text === null ? 'nav-link' : `nav-link_${props.text.color}`} tabIndex={4}>
          Услуги
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/employees' className={props.text === null ? 'nav-link' : `nav-link_${props.text.color}`} tabIndex={5}>
          Сотрудники
          </Link>
        </li>
        <li className='list-child'>
          <Link to='/about-us' className={props.text === null ? 'nav-link' : `nav-link_${props.text.color}`} tabIndex={6}>
          О нас
          </Link>
        </li>
      </ul>

      <ul className='nav-tel'>
        <li className='tel-list'><p className={props.text === null ? 'nav-tel-text' : `nav-tel-text_${props.text.color}`}>
          Горячая линия:
        </p><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375(29)xxx-xx-xx</span>
        </li>
        <li className='tel-list'><p className={props.text === null ? 'nav-tel-text' : `nav-tel-text_${props.text.color}`}>
          Анонимный звонок:</p><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>
          +375(29)xxx-xx-xx</span>
        </li>
      </ul>

      <div className='profile-wrap'>
        {
          !props.user ?
            <Link className={props.text === null ? 'entire-profile' : `entire-profile_${props.text.color}`} to='/auth' tabIndex={7}>Вход</Link>
            :
            props.user.userType !== 'админ' ?
              <Link className={props.text === null ? 'entire-profile' : `entire-profile_${props.text.color}`}
                to={`/profile/${props.user.id}`}>{props.user.secondName} tabIndex={7}
              </Link>
              :
              <Link className={props.text === null ? 'entire-profile' : `entire-profile_${props.text.color}`}
                to={'/admin'}>{props.user.userType} tabIndex={7}
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