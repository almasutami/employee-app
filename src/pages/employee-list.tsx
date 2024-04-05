import React, { useState, useEffect } from "react";
import BaseTable from "../components/global/base-table.tsx";
import EditEmployee from "../components/employee/edit-employee.tsx";
import { connect } from "react-redux";
import { updateEmployees } from "../redux/actions/employee.tsx";
import { InitialStateProps } from "../redux/reducers/employee.tsx";

export interface Employee {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const employeeTableHeaders = [
  { label: "Employee ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Active status", key: "isActive" },
  { label: "Actions", key: "" },
];

const EmployeeListing = ({ employeeList, updateEmployees }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const inputHandler = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    const fetchEmployees = () => {
      let filteredEmployees = employeeList as Employee[];

      if (searchQuery && filteredEmployees) {
        filteredEmployees = filteredEmployees.filter(
          (employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.id?.toString().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setEmployees(filteredEmployees || []);
    };

    fetchEmployees();
  }, [searchQuery, employeeList]);

  const onEditRow = (row: Employee) => {
    setIsEditModalOpen(true);
    setEmployeeToEdit(row);
  };

  const onCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const onSaveEmployee = (employee: Employee) => {
    updateEmployees(employee.id, employee);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <BaseTable
        title="Employee Listing"
        description="View and edit your employee here"
        headers={employeeTableHeaders}
        data={employees}
        onEditRow={onEditRow}
        queryState={searchQuery}
        onQueryChange={inputHandler}
        pageSize={5}
        objectName="employee"
      />

      {isEditModalOpen && (
        <EditEmployee
          employee={employeeToEdit}
          onClose={onCloseEditModal}
          onSave={onSaveEmployee}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: InitialStateProps) => {
  return {
    employeeList: state.employee.employeeList,
  };
};

const mapDispatchToProps = {
  updateEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListing);
