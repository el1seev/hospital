import { Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from "react";
import Nav from './components/nav/nav';
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import './App.css';
import Employees from "./pages/employees/employees";

const App = () => {
  const [modalActive, setModalActive] = useState(false);

  const setActive = () => {
    console.log(modalActive);
    if(modalActive){
      setModalActive(false)
      document.body.style.overflow_x = 'auto';
    } else {
      setModalActive(true)
      document.body.style.overflow_x = 'hidden';
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log(windowWidth);
    if(windowWidth >= 1301){
      setModalActive(false)
      document.body.style.overflow_x = 'auto';
    }
  }, [windowWidth]);

  return (
    <div className="App">
      <header className="App-header">
        <Nav setActive={setActive} modalActive={modalActive}/>
      </header>

      <div className={ !modalActive ? 'modal-nav' : 'modal-nav aсtive'}>
        <ul>
          <li className='list-child'><Link to='/home' className='nav-link' onClick={setActive}>Главная</Link></li>
          <li className='list-child'><Link to='/book-appointment' className='nav-link' onClick={setActive}>Запись на приём</Link></li>
          <li className='list-child'><Link to='/service' className='nav-link' onClick={setActive}>Услуги</Link></li>
          <li className='list-child'><Link to='/employees' className='nav-link' onClick={setActive}>Сотрудники</Link></li>
          <li className='list-child'><Link to='/about-us' className='nav-link' onClick={setActive}>О нас</Link></li>
        </ul>
      </div>

      <main className='App-main'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/employees' element={<Employees/>}/>
          </Routes>
      </main>

      <footer className='App-footer'>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
