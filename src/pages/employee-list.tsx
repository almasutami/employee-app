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
    isEditModalOpen: false,
    employeeToEdit: null as Employee | null,
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

  onEditRow = (row: Employee) => {
    this.setState({ isEditModalOpen: true });
    this.setState({ employeeToEdit: row });
  };

  onCloseEditModal = () => {
    this.setState({ isEditModalOpen: false });
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
      <div>
        <BaseTable
          title="Employee Listing"
          description="View and edit your employee here"
          headers={employeeTableHeaders}
          data={this.state.employees}
          onEditRow={(row: Employee) => this.onEditRow(row)}
          queryState={this.state.searchQuery}
          onQueryChange={(query) => this.inputHandler("searchQuery", query)}
          pageSize={5}
          objectName="employee"
        />

        {this.state.isEditModalOpen && (
          <div
            className="modal"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Edit {`${this.state.employeeToEdit?.name}`}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={this.onCloseEditModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Name, Email and Active status input fields here
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.onCloseEditModal}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EmployeeListing;
