import jwt_decode from 'jwt-decode';
import { deleteCategory, deleteEmployee, deletePatient, deleteService, deleteSpecialization } from './sendData';

export const adminDeleteOperations = async (args) => {
  console.log(args)
  const token = localStorage.getItem('token');
  if(token){
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
  let res;
  switch(args.operation){
    case 'удалить врача':
      res = deleteEmployee({id: args.name})
      return res.data;
    case 'удалить пациента':
      res = deletePatient({id: args.name})
      return res.data;
    case 'удалить специализацию':
      res = deleteSpecialization({id: args.name})
      return res.data;
    case 'удалить категорию':
      res = deleteCategory({id: args.name})
      return res.data;
    case 'удалить услугу':
      res = deleteService({id: args.name})
      return res.data;
    default:
      return null;
  }
}}