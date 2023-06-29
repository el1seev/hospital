import { Link } from 'react-router-dom';

import Mark from '../../assets/svgs/mark';
import './home.css';

const Home = (props) => {
  return (
    <div className='home' style={props.backgroundStyle}>
      <p className='schedule' style={props.text}>ВРЕМЯ РАБОТЫ:<br/> ПН-ПТ с 8:00 до 17:00</p>
      <ul className='main-nav'>
        <li>
          <Link to='/book-appointment' className='main-nav-li' style={props.text}>
          Запись на приём
          </Link>
        </li>
        <li><Link to='/services' className='main-nav-li' style={props.text}>Услуги</Link></li>
        <li><Link to='/employees' className='main-nav-li' style={props.text}>Сотрудники</Link></li>
        <li><Link to='/about-us' className='main-nav-li' style={props.text}>О нас</Link></li>
      </ul>

      <div className='address-wrap'>
        {props.text === null && <Mark className='mark'/>}
        <p className='address' style={props.text}>г. Брест, ул. Пушкина, д. 35</p>
      </div>
    </div>
  );
};

export default Home;