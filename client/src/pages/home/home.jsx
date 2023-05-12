import { Link } from 'react-router-dom';
import './home.css';
import Mark from '../../assets/svgs/mark';

const Home = () => {
  return (
    <div className="home">
      <p className='schedule'>ВРЕМЯ РАБОТЫ:<br/> ПН-ПТ с 8:00 до 17:00</p>
      <ul className='main-nav'>
        <li><Link to='/book-appointment' className='main-nav-li'>Запись на приём</Link></li>
        <li><Link to='/service' className='main-nav-li'>Услуги</Link></li>
        <li><Link to='/employees' className='main-nav-li'>Сотрудники</Link></li>
        <li><Link to='/about-us' className='main-nav-li'>О нас</Link></li>
      </ul>

      <div className='address-wrap'>
        <Mark className='mark'/>
        <p className='address'>г. Брест, ул. Пушкина, д. 35</p>
      </div>
    </div>
  );
}

export default Home;