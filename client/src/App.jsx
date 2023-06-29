import { Routes, Route, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Employees from './pages/employees/employees';
import Services from './pages/services/services';
import ServiceInfo from './pages/service-info/service-info';
import Appointments from './pages/appointments/appointments';
import AboutUs from './pages/about-us/about-us';
import Auth from './pages/auth/auth';
import Profile from './pages/profile/profile';
import Admin from './pages/admin-profile/admin-profile';
import BookAppointment from './pages/book-appointment/book-appointment';
import AdminAdd from './pages/admin-add/admin-add';
import AdminDelete from './pages/admin-delete/admin-delete';
import AdminUpdate from './pages/admin-update/admin-update';
import { checkToken } from './helpers/checkToken';
import './App.css';
import Error from './pages/error/error';

const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [visuallyChangerActive, setChangerActive] = useState(false);
  const [backColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);

  const setActive = () => {
    if(modalActive){
      setModalActive(false);
      document.body.style.overflowY = 'auto';
    } else {
      setModalActive(true);
      document.body.style.overflowY = 'hidden';
    }
  };

  const setVisuallyChangerActive = () => {
    setChangerActive(!visuallyChangerActive);
    setBackgroundColor('white');
    setTextColor('black');
  };

  const setVisualColor = (backgroundColor, txtColor) => {
    setBackgroundColor(backgroundColor);
    setTextColor(txtColor);
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    const verifiedToken = checkToken();
    if (verifiedToken) {
      setUser({
        userType:  verifiedToken.decodedToken.userType, firstName: verifiedToken.decodedToken.firstName,
        secondName: verifiedToken.decodedToken.secondName, id: verifiedToken.decodedToken.userId,
      });
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(windowWidth >= 1301){
      setModalActive(false);
      document.body.style.overflowY = 'auto';
    }
  }, [windowWidth]);

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='visually-block' style={ !!visuallyChangerActive ? {backgroundColor: backColor} : null}>
          <button className='visually-changer' style={{backgroundColor: `${backColor}`,
            color: `${textColor}`, border: `1px solid ${textColor}`}} onClick={setVisuallyChangerActive}
          >РЕЖИМ ДЛЯ СЛАБОВИДЯЩИХ: {visuallyChangerActive ? 'ВКЛ' : 'ВЫКЛ'}
          </button>
          {
            !!visuallyChangerActive &&
            (
              <>
                <button className='text-changer' style={{backgroundColor: 'white', color: 'black', border: '1px solid black'}}
                  onClick={e => setVisualColor('white', 'black')}
                >А
                </button>
                <button className='text-changer' style={{backgroundColor: 'black', color: 'white', border: '1px solid white'}}
                  onClick={e => setVisualColor('black', 'white')}
                >А
                </button>
              </>
            )
          }
        </div>
        <Nav setActive={setActive} modalActive={modalActive} user={user}
          backgroundStyle={ visuallyChangerActive ? {backgroundColor: `${backColor}`, backgroundImage: 'none'} : null}
          text={visuallyChangerActive ?  {color: `${textColor}`} : null}
        />
      </header>

      <div className={ !modalActive ? 'modal-nav' : 'modal-nav aсtive'} style={{backgroundColor: `${backColor}`}}>
        <ul>
          <li className='list-child'><Link to='/home' className='nav-link' onClick={setActive} style={{color: `${textColor}`}}>Главная</Link></li>
          <li className='list-child'>
            <Link to='/book-appointment' className='nav-link' onClick={setActive}
              style={{color: `${textColor}`}}>Запись на приём
            </Link>
          </li>
          <li className='list-child'><Link to='/services' className='nav-link' onClick={setActive} style={{color: `${textColor}`}}>Услуги</Link></li>
          <li className='list-child'>
            <Link to='/employees' className='nav-link' onClick={setActive} style={{color: `${textColor}`}}>
              Сотрудники
            </Link>
          </li>
          <li className='list-child'><Link to='/about-us' className='nav-link' onClick={setActive} style={{color: `${textColor}`}}>О нас</Link></li>
        </ul>
      </div>

      <main className='App-main'>
        <Routes>
          <Route path='/' element={<Home backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`, boxShadow: 'none'} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/home' element={<Home backgroundStyle={ visuallyChangerActive ?
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/employees' element={<Employees backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/employees/:id/appointments' element={<Appointments backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/services' element={<Services backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`, boxShadow: 'none'} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/services/:id' element={<ServiceInfo backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`, boxShadow: 'none'} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/about-us' element={<AboutUs backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/auth' element={<Auth backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          <Route path='/book-appointment' element={<BookAppointment backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>}
          />
          {
            user !== null && (
              <Route path={`/profile/${user.id}`} element={
                <Profile backgroundStyle={ visuallyChangerActive ? 
                  {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
                  {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>
              }
              />
            )
          }
          {
            user && user.userType === 'админ' && 
            (
              <>
                <Route path='/admin' element={
                  <Admin backgroundStyle={ visuallyChangerActive ? 
                    {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
                    {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>
                }/> 
                <Route path='/admin/add' element={<AdminAdd backgroundStyle={ visuallyChangerActive ? 
                  {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
                  {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>
                }/>
                <Route path='/admin/update' element={<AdminUpdate backgroundStyle={ visuallyChangerActive ? 
                  {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
                  {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>
                }/>
                <Route path='/admin/delete' element={<AdminDelete backgroundStyle={ visuallyChangerActive ? 
                  {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
                  {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>
                }/>
              </> 
            )
          }
          <Route path='*' element={<Error backgroundStyle={ visuallyChangerActive ? 
            {backgroundImage: 'none', backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ?
            {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}/>
          }/>
        </Routes>
      </main>

      <footer className='App-footer'>
        <Footer backgroundStyle={ visuallyChangerActive ? { backgroundColor: `${backColor}`} : null} text={visuallyChangerActive ? 
          {color: `${textColor}`, webkitTextStroke: '0cm', textShadow: 'none'} : null}
        />
      </footer>
    </div>
  );
};

export default App;
