import './reception-tel.css'

const ReceptionTel = () => {
  return (
    <div className='reception-tel-wrap'>
      {
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
      <a href='tel:+375(29)111-11-11' className='reception-tel'><span>РЕГИСТРАТУРА:</span> +375(29)111-11-11</a>
      :
      <p href='tel:+375(29)111-11-11' className='reception-tel'><span>РЕГИСТРАТУРА:</span> +375(29)111-11-11</p>
      }
    </div>
  );
}

export default ReceptionTel;