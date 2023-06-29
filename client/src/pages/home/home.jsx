import { Link } from 'react-router-dom';

import Mark from '../../assets/svgs/mark';
import './home.css';

const Home = (props) => {
  return (
    <div className='home' style={props.backgroundStyle}>
      <p className={props.text === null ? 'schedule' : `schedule_${props.text.color}`}>ВРЕМЯ РАБОТЫ:<br/> ПН-ПТ с 8:00 до 17:00</p>
      <ul className='main-nav'>
        <li>
          <Link to='/book-appointment' className={props.text === null ? 'main-nav-li' : `main-nav-li_${props.text.color}`}>
          Запись на приём
          </Link>
        </li>
        <li><Link to='/services' className={props.text === null ? 'main-nav-li' : `main-nav-li_${props.text.color}`}>Услуги</Link></li>
        <li><Link to='/employees' className={props.text === null ? 'main-nav-li' : `main-nav-li_${props.text.color}`}>Сотрудники</Link></li>
        <li><Link to='/about-us' className={props.text === null ? 'main-nav-li' : `main-nav-li_${props.text.color}`}>О нас</Link></li>
      </ul>

      <div className='address-wrap'>
        {props.text === null && <Mark className='mark'/>}
        <p className={props.text === null ? 'address' : `address_${props.text.color}`}>г. Брест, ул. Пушкина, д. 35</p>
      </div>
    </div>
  );
};

export default Home;