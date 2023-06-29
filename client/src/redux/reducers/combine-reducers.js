import { combineReducers } from 'redux';

import employeesReducer from './employees-reducer';
import servicesReducer from './services-reducer';
import specializationsReducer from './specializations';

export const reducer = combineReducers({
  employees: employeesReducer,
  services: servicesReducer,
  specializations: specializationsReducer,
});