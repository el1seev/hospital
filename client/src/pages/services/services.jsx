import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ReceptionTel from '../../components/reception-tel/reception-tel';
import './services.css';
import { getServices } from '../../redux/actions/actions';

const Services = () => {
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
    <div className='services-page'>
      <ReceptionTel/>
      {
        !services ?
          <p className='loading'>Загрузка...</p>
          :
          <div className='services-wrap'>
            {
              services.map( service => (
                <Link to={`/services/${service._id}`} key={service._id} className='service-wrap'>
                  <div className='service-container' style={{backgroundImage: `url(${service.image})`}} alt={`${service.name}`}>
                    <div className='service-name-wrap'>
                      <p className='service-name'>{service.name}</p>
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