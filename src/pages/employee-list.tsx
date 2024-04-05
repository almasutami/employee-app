import React, { useState, useEffect } from "react";
import BaseTable from "../components/global/base-table.tsx";
import EditEmployee from "../components/employee/edit-employee.tsx";
import employeeData from "../data/employee.json";

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

const EmployeeListing = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const inputHandler = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    const fetchEmployees = () => {
      let filteredEmployees = employeeData.employees as Employee[];

      if (searchQuery) {
        filteredEmployees = filteredEmployees.filter(
          (employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.id?.toString().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setEmployees(filteredEmployees);
    };

    fetchEmployees();
  }, [searchQuery]);

  const onEditRow = (row: Employee) => {
    setIsEditModalOpen(true);
    setEmployeeToEdit(row);
  };

  const onCloseEditModal = () => {
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
        <EditEmployee employee={employeeToEdit} onClose={onCloseEditModal} />
      )}
    </div>
  );
};

export default EmployeeListing;
