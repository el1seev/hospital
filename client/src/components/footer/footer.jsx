import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-tel'>
          <div>
          <p className='footer-tel-info'>ОБЩЕНАЦИОНАЛЬНАЯ ДЕСТКАЯ ЛИНИЯ ДЛЯ ПОСТРАДАВШИХ ОТ ДОМАШНЕГО НАСИЛИЯ:
          <br/><span className='tel'>+375 (33) xxx-xx-xx</span>
          </p>
          <p className='footer-tel-info'>ТЕЛЕФОН ДОВЕРИЯ:
          <br/><span className='tel'>+375 (33) xxx-xx-xx</span>
          </p>
          </div>
  
          <div>
          <p className='footer-tel-info'>ОБЩЕНАЦИОНАЛЬНАЯ БЕСПЛАТНАЯ ЛИНИЯ ДЛЯ ПОСТРАДАВШИХ ОТ  ДОМАШНЕГО НАСИЛИЯ:
          <br/><span className='tel'>+375 (33) xxx-xx-xx</span>
          </p>
          <p className='footer-tel-info'>ТЕЛЕФОН ДОВЕРИЯ ДЛЯ ОКАЗАНИЯ ЭКСТРЕННОЙ ПСИХОЛОГИЧЕСКОЙ ПОМОЩИ: 
          <br/><span className='tel'>+375 (33) xxx-xx-xx</span>
          </p>
          </div>
      </div>


        <div className='footer-info'>
          <div className='footer-nav'>
            <ul className='info'>
              ИНФОРМАЦИЯ:
              <li><Link to='/about-us'>о нас</Link></li>
              <li><Link to='/employees'>сотрудники</Link></li>
            </ul>
            <ul className='info'>
              КОНСУЛЬТАЦИЯ:
              <li><Link to='/service'>услуги</Link></li>
              <li><Link to='/book-appointment'>запись на приём</Link></li>
            </ul>
          </div>

          <div className='foot-tel-mobview'>
            {
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
              <>
                <a className='footer-tel-info' href='+375(29)123-12-12'>Горячая линия:
                <br/><span className='tel'>+375(29)123-12-12</span>
                </a>

                <a className='footer-tel-info' href='+375(29)123-12-12'>Анонимный звонок:
                <br/><span className='tel'>+375(29)123-12-12</span>
                </a>
              </>
              :
              <>
                <p className='footer-tel-info'>Горячая линия:
                <br/><span className='tel'>+375 (33) xxx-xx-xx</span>
                </p>

                <p className='footer-tel-info'>Анонимный звонок:
                <br/><span className='tel'>+375 (33) xxx-xx-xx</span>
                </p>
              </>
            }

          </div>

          <div className='footer-schedule'>
            <p>
              график приёма врачей: пн-пт с 8:00 до 17:00
            </p>
            <p>
              график работы экстренных служб: <span>круглосуточно</span>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Footer;