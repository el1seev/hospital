import jwt_decode from 'jwt-decode';

export const checkToken = () => {
  const token = localStorage.getItem('token');
  if(token){
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      return {token: token, decodedToken: decodedToken};
    }
  }
}