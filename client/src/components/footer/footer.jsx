import { Link } from 'react-router-dom';
import './footer.css';

const Footer = (props) => {
  return (
    <div className={props.text === null ? 'footer' : `footer_${props.text.color}`} style={props.backgroundStyle}>
      <div className='footer-tel'>
        <div>
          <p className='footer-tel-info' style={props.text}>
            ОБЩЕНАЦИОНАЛЬНАЯ ДЕСТКАЯ ЛИНИЯ ДЛЯ ПОСТРАДАВШИХ ОТ ДОМАШНЕГО НАСИЛИЯ:
            <br/><span className='tel' style={props.text}>+375 (33) xxx-xx-xx</span>
          </p>
          <p className='footer-tel-info' style={props.text}>ТЕЛЕФОН ДОВЕРИЯ:
            <br/><span className='tel' style={props.text}>+375 (33) xxx-xx-xx</span>
          </p>
        </div>
  
        <div>
          <p className='footer-tel-info' style={props.text}>
            ОБЩЕНАЦИОНАЛЬНАЯ БЕСПЛАТНАЯ ЛИНИЯ ДЛЯ ПОСТРАДАВШИХ ОТ  ДОМАШНЕГО НАСИЛИЯ:
            <br/><span className='tel' style={props.text}>+375 (33) xxx-xx-xx</span>
          </p>
          <p className='footer-tel-info' style={props.text}>
            ТЕЛЕФОН ДОВЕРИЯ ДЛЯ ОКАЗАНИЯ ЭКСТРЕННОЙ ПСИХОЛОГИЧЕСКОЙ ПОМОЩИ: 
            <br/><span className='tel' style={props.text}>+375 (33) xxx-xx-xx</span>
          </p>
        </div>
      </div>


      <div className='footer-info'>
        <div className='footer-nav'>
          <ul className='info' style={props.text}>
              ИНФОРМАЦИЯ:
            <li><Link to='/about-us' style={props.text}>о нас</Link></li>
            <li><Link to='/employees' style={props.text}>сотрудники</Link></li>
          </ul>
          <ul className='info' style={props.text}>
              КОНСУЛЬТАЦИЯ:
            <li><Link to='/services' style={props.text}>услуги</Link></li>
            <li><Link to='/book-appointment' style={props.text}>запись на приём</Link></li>
          </ul>
        </div>

        <div className='foot-tel-mobview'>
          {
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
              <>
                <a className='footer-tel-info' style={props.text} href='+375(29)123-12-12'>
                Горячая линия:
                  <br/><span className='tel' style={props.text}>+375(29)123-12-12</span>
                </a>

                <a className='footer-tel-info' style={props.text} href='+375(29)123-12-12'>
                Анонимный звонок:
                  <br/><span className='tel' style={props.text}>+375(29)123-12-12</span>
                </a>
              </>
              :
              <>
                <p className='footer-tel-info' style={props.text}>
                Горячая линия:
                  <br/><span className='tel' style={props.text}>+375 (33) xxx-xx-xx</span>
                </p>

                <p className='footer-tel-info' style={props.text}>
                Анонимный звонок:
                  <br/><span className='tel' style={props.text}>+375 (33) xxx-xx-xx</span>
                </p>
              </>
          }

        </div>

        <div className={props.text === null ? 'footer-schedule' : `footer-schedule_${props.text.color}`}>
          <p style={props.text}>
            график приёма врачей: пн-пт с 8:00 до 17:00
          </p>
          <p style={props.text}>
            график работы экстренных служб: <span>круглосуточно</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;