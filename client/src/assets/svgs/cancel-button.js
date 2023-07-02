const CancelButton = (props) => {
  return (
    <svg className='cancel-svg' fill={props.buttonColor ? props.buttonColor.color :'#ffffff'} viewBox='0 0 32 32' version='1.1'
      xmlns='http://www.w3.org/2000/svg' stroke={props.buttonColor ? props.buttonColor.color :'#ffffff'}>
      <g id='SVGRepo_bgCarrier' stroke-width='0'/>
      <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/>
      <g id='SVGRepo_iconCarrier'> 
        <title>закрыть</title>
        <path d='M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039
      0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097
      6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038
      0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396
      1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151
      2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z'/>
      </g>
    </svg>
  );
};

export default CancelButton; 