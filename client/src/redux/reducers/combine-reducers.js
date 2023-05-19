import { combineReducers } from "redux";

import employeesReducer from "./employees-reducer";
import servicesReducer from "./services-reducer";
import appointmentsReducer from "./appointments-reducer";
import specializationsReducer from "./specializations";

export const reducer = combineReducers({
  appointments: appointmentsReducer,
  employees: employeesReducer,
  services: servicesReducer,
  specializations: specializationsReducer,
});