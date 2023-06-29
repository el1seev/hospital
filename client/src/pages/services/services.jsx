import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ReceptionTel from '../../components/reception-tel/reception-tel';
import './services.css';
import { getServices } from '../../redux/actions/actions';

const Services = (props) => {
  const services = useSelector(state => state.services.services);
  const dispatch = useDispatch();

  const handleServices = () => {
    dispatch(getServices());
  };

  useEffect(() => {
    handleServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='services-page' style={props.backgroundStyle}>
      <ReceptionTel back={props.backgroundStyle} txt={props.text}/>
      {
        !services ?
          <p className='loading'>Загрузка...</p>
          :
          <div className='services-wrap'>
            {
              services.map( service => (
                <Link to={`/services/${service._id}`} key={service._id} className='service-wrap'>
                  <div className={props.backgroundStyle !== null ?
                    `service-container_${props.backgroundStyle.backgroundColor}`
                    : 'service-container'} style={props.backgroundColor !== null ?
                    props.backgroundStyle : {backgroundImage: `url(${service.image})`}} alt={`${service.name}`}>
                    <div className='service-name-wrap' style={props.backgroundStyle}>
                      <p className='service-name' style={props.text}>{service.name}</p>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
      }
    </div>
  );
};

export default Services;