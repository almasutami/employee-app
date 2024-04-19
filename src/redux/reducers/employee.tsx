import employeeData from "../../data/employee.json";
import type { Employee } from "../../pages/employee-list.tsx";

export interface InitialStateProps {
  employee: {
    employeeList: Employee[];
  };
}

const initialState = {
  employeeList: employeeData.employees,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "EMPLOYEE_UPDATE":
      const updatedEmployeeList = state.employeeList.map((employee) => {
        if (employee.id === action.payload.employeeId) {
          return action.payload.employeeData;
        } else {
          return employee;
        }
      });
      return { ...state, employeeList: updatedEmployeeList };
    case "EMPLOYEE_DELETE":
      const updatedEmployeeListAfterDelete = state.employeeList.filter(
        (employee) => employee.id !== action.payload.employeeId
      );
      return { ...state, employeeList: updatedEmployeeListAfterDelete };
    default:
      return state;
  }
};

export default reducer;
