import { Link } from 'react-router-dom';
import './footer.css';

const Footer = (props) => {
  return (
    <div className={props.text === null ? 'footer' : `footer_${props.text.color}`} style={props.backgroundStyle}>
      <div className='footer-tel'>
        <div>
          <p className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`}>
            ОБЩЕНАЦИОНАЛЬНАЯ ДЕСТКАЯ ЛИНИЯ ДЛЯ ПОСТРАДАВШИХ ОТ ДОМАШНЕГО НАСИЛИЯ:
            <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375 (33) xxx-xx-xx</span>
          </p>
          <p className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`}>ТЕЛЕФОН ДОВЕРИЯ:
            <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375 (33) xxx-xx-xx</span>
          </p>
        </div>
  
        <div>
          <p className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`}>
            ОБЩЕНАЦИОНАЛЬНАЯ БЕСПЛАТНАЯ ЛИНИЯ ДЛЯ ПОСТРАДАВШИХ ОТ  ДОМАШНЕГО НАСИЛИЯ:
            <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375 (33) xxx-xx-xx</span>
          </p>
          <p className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`}>
            ТЕЛЕФОН ДОВЕРИЯ ДЛЯ ОКАЗАНИЯ ЭКСТРЕННОЙ ПСИХОЛОГИЧЕСКОЙ ПОМОЩИ: 
            <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375 (33) xxx-xx-xx</span>
          </p>
        </div>
      </div>


      <div className='footer-info'>
        <div className='footer-nav'>
          <ul className={props.text === null ? 'info' : `info_${props.text.color}`}>
              ИНФОРМАЦИЯ:
            <li><Link to='/about-us'>о нас</Link></li>
            <li><Link to='/employees'>сотрудники</Link></li>
          </ul>
          <ul className={props.text === null ? 'info' : `info_${props.text.color}`}>
              КОНСУЛЬТАЦИЯ:
            <li><Link to='/services'>услуги</Link></li>
            <li><Link to='/book-appointment'>запись на приём</Link></li>
          </ul>
        </div>

        <div className='foot-tel-mobview'>
          {
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
              <>
                <a className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`} href='+375(29)123-12-12'>
                Горячая линия:
                  <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375(29)123-12-12</span>
                </a>

                <a className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`} href='+375(29)123-12-12'>
                Анонимный звонок:
                  <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375(29)123-12-12</span>
                </a>
              </>
              :
              <>
                <p className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`}>
                Горячая линия:
                  <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375 (33) xxx-xx-xx</span>
                </p>

                <p className={props.text === null ? 'footer-tel-info' : `footer-tel-info_${props.text.color}`}>
                Анонимный звонок:
                  <br/><span className={props.text === null ? 'tel' : `tel_${props.text.color}`}>+375 (33) xxx-xx-xx</span>
                </p>
              </>
          }

        </div>

        <div className={props.text === null ? 'footer-schedule' : `footer-schedule_${props.text.color}`}>
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
};

export default Footer;