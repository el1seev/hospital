import jwt_decode from 'jwt-decode';
import { addCategory, addDoctor, addPatient, addService, addServiceDescription, addSpecialization } from './sendData';

export const adminAddOperations = async (args) => {
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
    case 'добавить врача':
      res = await addDoctor
      ({passportId: args.passport,
        firstName: args.firstName,
        secondName: args.secondName,
        middleName: args.middleName,
        dateOfBirth: args.dateOfBirth,
        specialization: args.specialization,
        category: args.category,
        password: args.password,
        shift: args.shit })
      return res.data;
    case 'добавить пациента':
      res = await addPatient
      ({passportId: args.passport,
        firstName: args.firstName,
        secondName: args.secondName,
        middleName: args.middleName,
        dateOfBirth: args.dateOfBirth,
        address: args.address,
        phone: args.phone,
        gender: args.gender,
        password: args.password})
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