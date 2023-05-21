import { deleteCategory, deleteEmployee, deletePatient, deleteService, deleteSpecialization } from './sendData';
import { checkToken } from '../helpers/checkToken';

export const adminDeleteOperations = async (args) => {
  const verifiedToken = checkToken();
  if(verifiedToken){
  let res;
  switch(args.operation){
    case 'удалить врача':
      res = deleteEmployee({id: args.passport})
      return res.data;
    case 'удалить пациента':
      res = deletePatient({id: args.passport})
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