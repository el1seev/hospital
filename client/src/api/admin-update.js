import { checkToken } from '../helpers/checkToken';
import { removeEmptyFields } from '../helpers/filterObjects';

import { UpdateCategory, UpdateDoctor, UpdatePatient, UpdateService, UpdateServiceDescription, UpdateSpecialization } from './operations-update';

export const adminUpdateOperations = async (args) => {
  const verifiedToken = checkToken();
  if(verifiedToken){
    let res;
    let filteredObj = removeEmptyFields(args);
    switch(args.operation){
    case 'изменить врача':
      res = await UpdateDoctor
      ({...filteredObj});
      return res.data;
    case 'изменить пациента':
      res = await UpdatePatient
      ({...filteredObj});
      return res.data;
    case 'изменить услугу':
      res = await UpdateService
      ({...filteredObj});
      return res.data;
    case 'изменить описание услуги':
      res = await UpdateServiceDescription
      ({...filteredObj});
      return res.data;
    case 'изменить специализацию':
      res = await UpdateSpecialization
      ({...filteredObj});
      return res.data;
    case 'изменить категорию':
      res = await UpdateCategory
      ({...filteredObj});
      return res.data;
    default:
      return null;
    }
  }};