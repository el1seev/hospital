import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getServices } from '../../redux/actions/actions';
import './service-info.css';

const ServiceInfo = () => {
  const { id } = useParams();
  const services = useSelector(state => state.services.services);
  const service = services.find(service => service._id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!service){ 
      dispatch(getServices());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='service-info-page'>
      <div className='reception-tel-wrap'>
        {
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
            <a href='tel:+375(29)111-11-11' className='reception-tel'><span>КОНСУЛЬТАЦИЯ И ЗАПИСЬ НА ПРОЦЕДУРЫ:</span> +375(29)111-11-11</a>
            :
            <p href='tel:+375(29)111-11-11' className='reception-tel'><span>КОНСУЛЬТАЦИЯ И ЗАПИСЬ НА ПРОЦЕДУРЫ:</span> +375(29)111-11-11</p>
        }
      </div>
      {
        !service ?
          <p className='loading'>Загрузка...</p>
          :
          <table className='service-info'>
            <th className='service-info-header'>Наименование услуги</th><th className='service-info-header'>Цена,<br/> руб.</th>
            {
              service.description.map( descriptionService => (
                <tr key={descriptionService._id}>
                  <td className='service-info-value'>{descriptionService.type}</td>
                  <td className='service-info-value'>{descriptionService.price}</td>
                </tr>
              ))
            }
          </table>
      }

    </div>
  );
};

export default ServiceInfo;