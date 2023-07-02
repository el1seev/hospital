import './error.css';

const Error = (props) => {
  return (
    <div className='error-page' style={props.backgroundStyle}>
      <h1 style={props.text}>Page not found</h1>
      <h2 style={props.text}>Error 404</h2>
    </div>
  );
};

export default Error;