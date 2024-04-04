import React from "react";
import BaseInput from "../components/global/base-input.tsx";
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
    nameQuery: "",
    emailQuery: "",
    isActiveFilter: null as boolean | null,
  };

  inputHandler = (name: string, value: string) => {
    this.setState({ [name]: value });
  };

  fetchEmployees = () => {
    let filteredEmployees = employeeData.employees as Employee[];

    if (this.state.nameQuery) {
      filteredEmployees = filteredEmployees.filter((employee) =>
        employee.name.toLowerCase().includes(this.state.nameQuery.toLowerCase())
      );
    }

    this.setState({ employees: filteredEmployees });
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.nameQuery !== this.state.nameQuery) {
      this.setState({ currentPage: 1 });
      this.fetchEmployees();
    }
  }

  render() {
    return (
      <div>
        <div
          className={`filter d-flex flex-wrap justify-content-between px-4 py-2 flex-row align-items-center`}
        >
          <div>
            <BaseInput
              label="Name"
              placeholder="Filter by name"
              value={this.state.nameQuery}
              onChange={(value: string) =>
                this.inputHandler("nameQuery", value)
              }
            />
          </div>
        </div>
        <div className={`d-flex flex-row justify-content-end mx-2`}></div>
        {/* employees */}
        <div className={`border shadow-sm mx-4 my-3 p-4`}>
          <div>
            <BaseTable
              headers={employeeTableHeaders}
              data={this.state.employees}
              pageSize={5}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeListing;
