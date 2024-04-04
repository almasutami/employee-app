import React from "react";
import BaseTable from "../components/global/base-table.tsx";
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

class EmployeeListing extends React.Component {
  state = {
    employees: [] as Employee[],
    currentPage: 1,
    searchQuery: "",
    isActiveFilter: null as boolean | null,
  };

  inputHandler = (name: string, value: string) => {
    this.setState({ [name]: value });
  };

  fetchEmployees = () => {
    let filteredEmployees = employeeData.employees as Employee[];

    if (this.state.searchQuery) {
      filteredEmployees = filteredEmployees.filter((employee) =>
        employee.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase())
      );
    }

    this.setState({ employees: filteredEmployees });
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ currentPage: 1 });
      this.fetchEmployees();
    }
  }

  render() {
    return (
      <BaseTable
        title="Employee Listing"
        description="View and edit your employee here"
        headers={employeeTableHeaders}
        data={this.state.employees}
        queryState={this.state.searchQuery}
        onQueryChange={(query) => this.inputHandler("searchQuery", query)}
        pageSize={5}
        objectName="employee"
      />
    );
  }
}

export default EmployeeListing;
