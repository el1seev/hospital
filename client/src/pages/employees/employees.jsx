import DoctorLogo from '../../assets/svgs/doctor-logo';
import './employees.css';

const Employees = () => {
  const employees = [
    {_id: 11, firstName: 'Сергей', secondName: 'Фиолетов', middleName: 'Дмитрьевич', rank: '2-я категория', speacialization: 'травматолог'},
    {_id: 12, firstName: 'Сергей', secondName: 'Фиолетов', middleName: 'Дмитрьевич', rank: '2-я категория', speacialization: 'травматолог'},
    {_id: 13, firstName: 'Сергей', secondName: 'Фиолетов', middleName: 'Дмитрьевич', rank: '2-я категория', speacialization: 'травматолог'},
    {_id: 14, firstName: 'Сергей', secondName: 'Фиолетов', middleName: 'Дмитрьевич', rank: '2-я категория', speacialization: 'травматолог'},
    {_id: 15, firstName: 'Сергей', secondName: 'Фиолетов', middleName: 'Дмитрьевич', rank: '2-я категория', speacialization: 'травматолог'},
    {_id: 16, firstName: 'Сергей', secondName: 'Фиолетов', middleName: 'Дмитрьевич', rank: '2-я категория', speacialization: 'травматолог'}
  ];
  return(
    <div className='employees-page'>
      <div className='reception-tel-wrap'>
        {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
        <a href='tel:+375(29)111-11-11' className='reception-tel'><span>РЕГИСТРАТУРА:</span> +375(29)111-11-11</a>
        :
        <p href='tel:+375(29)111-11-11' className='reception-tel'><span>РЕГИСТРАТУРА:</span> +375(29)111-11-11</p>
        }
      </div>
      <div className='emlpoyees-wrap'>
      { employees.map( employee => (
        <div className='doctor-wrap' key={employee._id}>
          <div className='doctor-container'>
            <div className='doctor-logo'> 
              <DoctorLogo/>
            </div>
            <div className='doctor-descriptions'>
              <p className='doctor-info'>{employee.firstName}</p>
              <p className='doctor-info'>{employee.speacialization}, {employee.rank}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Employees;