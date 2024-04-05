import type { Employee } from "../../pages/employee-list.tsx";

export const updateEmployees = (employeeId: number, employeeData: Employee) => {
  return (dispatch) => {
    dispatch({
      type: "EMPLOYEE_UPDATE",
      payload: { employeeId, employeeData },
    });
  };
};
