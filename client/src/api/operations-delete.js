import axios from 'axios';

import { checkToken } from '../helpers/checkToken';
import { filterObject } from '../helpers/filterObjects';



export const deletePatient = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(
        `http://localhost:5000/api/patients/${args.id}`,
        { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteEmployee = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(
        `http://localhost:5000/api/doctors/${args.id}`,
        { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteSpecialization = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(
        `http://localhost:5000/api/specializations/${args.id}`,
        { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken){
      const response = await axios.delete(
        `http://localhost:5000/api/categories/${args.id}`,
        { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteService = async (args) => {
  try {
    const verifiedToken = checkToken();
    if(verifiedToken)
    {
      const response = await axios.delete(
        `http://localhost:5000/api/services/${args.id}`,
        { headers: { Authorization: `Bearer ${verifiedToken.token}` } }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

