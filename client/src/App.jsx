import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';

import Nav from './components/nav/nav';
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Employees from "./pages/employees/employees";
import Services from "./pages/services/services";
import ServiceInfo from "./pages/service-info/service-info";
import Appointments from "./pages/appointments/appointments";
import Auth from "./pages/auth/auth";
import Profile from "./pages/profile/profile";
import './App.css';
import Admin from "./pages/admin-profile/admin-profile";
import BookAppointment from "./pages/book-appointment/book-appointment";
import AdminAdd from "./pages/admin-add/admin-add";
import AdminDelete from "./pages/admin-delete/admin-delete";
import AdminUpdate from "./pages/admin-update/admin-update";

const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const setActive = () => {
    console.log(modalActive);
    if(modalActive){
      setModalActive(false)
      document.body.style.overflowY = 'auto';
    } else {
      setModalActive(true)
      document.body.style.overflowY = 'hidden';
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        setUser({userType:  decodedToken.userType, firstName: decodedToken.firstName ,secondName: decodedToken.secondName, id: decodedToken.userId});
      }
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(windowWidth >= 1301){
      setModalActive(false)
      document.body.style.overflowY = 'auto';
    }
  }, [windowWidth]);

  return (
    <div className="App">
      <header className="App-header">
        <Nav setActive={setActive} modalActive={modalActive} user={user}/>
      </header>

      <div className={ !modalActive ? 'modal-nav' : 'modal-nav aсtive'}>
        <ul>
          <li className='list-child'><Link to='/home' className='nav-link' onClick={setActive}>Главная</Link></li>
          <li className='list-child'><Link to='/book-appointment' className='nav-link' onClick={setActive}>Запись на приём</Link></li>
          <li className='list-child'><Link to='/services' className='nav-link' onClick={setActive}>Услуги</Link></li>
          <li className='list-child'><Link to='/employees' className='nav-link' onClick={setActive}>Сотрудники</Link></li>
          <li className='list-child'><Link to='/about-us' className='nav-link' onClick={setActive}>О нас</Link></li>
        </ul>
      </div>

      <main className='App-main'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/employees' element={<Employees/>}/>
            <Route path='/employees/:id/appointments' element={<Appointments/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/services/:id' element={<ServiceInfo/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/book-appointment' element={<BookAppointment/>}/>
            {
              user !== null && (<Route path={`/profile/${user.id}`} element={<Profile/>}/>)
            }
            {
              user && user.userType === 'админ' && 
              (
              <>
                <Route path='/admin' element={<Admin/>}/> 
                <Route path='/admin/add' element={<AdminAdd/>}/>
                <Route path='/admin/update' element={<AdminUpdate/>}/>
                <Route path='/admin/delete' element={<AdminDelete/>}/>
              </> 
              )
            }
          </Routes>
      </main>

      <footer className='App-footer'>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
