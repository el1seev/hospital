import axios from 'axios';

import { checkToken } from '../helpers/checkToken';


export const addDoctor = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post(
        'http://localhost:5000/api/doctors/add',
        {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};


export const addCategory = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post(
        'http://localhost:5000/api/category/add',
        {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addSpecialization = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post(
        'http://localhost:5000/api/specialization/add',
        {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addPatient = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post(
        'http://localhost:5000/api/patients/add', {...args},
        { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addService = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      let response = await axios.post(
        'http://localhost:5000/api/service/add',
        {...args}, { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addServiceDescription = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken)
    {
      let response = await axios.put(
        `http://localhost:5000/api/service/description/${args.id}`, {type: args.type, price: args.price},
        { headers: { Authorization: `Bearer ${verifiedToken.token}` }}
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
