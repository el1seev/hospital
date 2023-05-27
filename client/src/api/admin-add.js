import { addCategory, addDoctor, addPatient, addService, addServiceDescription, addSpecialization } from './sendData';
import { checkToken } from '../helpers/checkToken';
import { filterObject, removeEmptyFields } from '../helpers/filterObjects';

export const adminAddOperations = async (args) => {
  const verifiedToken = checkToken();
  if(verifiedToken){
  let res;
  let newObj = removeEmptyFields(args);
  let filteredObj = filterObject(args);
  switch(args.operation){
    case 'добавить врача':
      res = await addDoctor
      ({...filteredObj});
      return res.data;
    case 'добавить пациента':
      res = await addPatient
      ({...filteredObj});
      return res.data
    case 'добавить специализацию':
      res = await addSpecialization({name: args.name})
      return res.data
    case 'добавить категорию':
      res = await addCategory({name: args.name})
      return res.data
    case 'добавить услугу':
      res = await addService({name: args.name, image: args.image, description: [{type: args.type, price: args.price}]})
      return res.data
    case 'добавить описание услуги':
      res = await addServiceDescription({id: args.name, type: args.type, price: args.price})
      return res.data
    default:
      return null;
  }
}}