import type { Employee } from "../../pages/employee-list.tsx";

export const updateEmployees = (employeeId: number, employeeData: Employee) => {
  return (dispatch) => {
    dispatch({
      type: "EMPLOYEE_UPDATE",
      payload: { employeeId, employeeData },
    });
  };
};

export const deleteEmployee = (employeeId: number) => {
  return (dispatch) => {
    dispatch({
      type: "EMPLOYEE_DELETE",
      payload: { employeeId },
    });
  };
};
