import React, { useState, useEffect } from "react";
import BaseTable from "../components/global/base-table.tsx";
import EditEmployee from "../components/employee/edit-employee.tsx";
import { connect } from "react-redux";
import { updateEmployees, deleteEmployee } from "../redux/actions/employee.tsx";
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

const EmployeeListing = ({ employeeList, updateEmployees, deleteEmployee }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const inputHandler = (value: string) => {
    setSearchQuery(value);
  };

  // function debounce(callback, time) {
  //   let interval;
  //   return () => {
  //     clearTimeout(interval);
  //     interval = setTimeout(() => {
  //       interval = null;
  //       callback(arguments);
  //     }, time);
  //   };
  // }

  useEffect(() => {
    const fetchEmployees = () => {
      let filteredEmployees = employeeList as Employee[];
      console.log(searchQuery);
      console.log(employeeList);

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
    setSelectedEmployee(row);
  };

  const onDeleteRow = (row: Employee) => {
    setIsDeleteModalOpen(true);
    setSelectedEmployee(row);
  };

  const onCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const onSaveEmployee = (employee: Employee) => {
    updateEmployees(employee.id, employee);
    setIsEditModalOpen(false);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onConfirmDeleteEmployee = (employee: Employee) => {
    deleteEmployee(employee.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <BaseTable
        title="Employee Listing"
        description="View and edit your employee here"
        headers={employeeTableHeaders}
        data={employees}
        onEditRow={onEditRow}
        onDeleteRow={onDeleteRow}
        queryState={searchQuery}
        onQueryChange={inputHandler}
        pageSize={5}
        objectName="employee"
      />

      {isEditModalOpen && (
        <EditEmployee
          mode="edit"
          employee={selectedEmployee}
          onClose={onCloseEditModal}
          onSave={onSaveEmployee}
        />
      )}

      {isDeleteModalOpen && (
        <EditEmployee
          mode="delete"
          employee={selectedEmployee}
          onClose={onCloseDeleteModal}
          onDelete={onConfirmDeleteEmployee}
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
  deleteEmployee,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListing);
