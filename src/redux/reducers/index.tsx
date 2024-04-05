import { combineReducers } from "redux";
import employeeReducer from "./employee.tsx";

export default combineReducers({
  employee: employeeReducer,
});
