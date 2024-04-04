import React from "react";
// import "../assets/styles/employee-list.css";
import employeeData from "../data/employee.json";
import BaseInput from "../components/global/base-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Employee {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class EmployeeListing extends React.Component {
  state = {
    employees: [] as Employee[],
    currentPage: 1,
    nameQuery: "",
    emailQuery: "",
    isActive: null as boolean | null,
  };

  inputHandler = (event) => {
    const value = event.target.value as string;
    const name = event.target.name as string;

    this.setState({ [name]: value });
  };

  fetchEmployees = () => {
    let filteredEmployees = employeeData.employees as Employee[];
    console.log(filteredEmployees);

    if (this.state.nameQuery) {
      filteredEmployees?.filter((employee) => {
        return employee.name
          .toLowerCase()
          .includes(this.state.nameQuery.toLowerCase());
      });
    }
    console.log(filteredEmployees);

    this.setState({ employees: filteredEmployees });
  };

  handleSearch = () => {
    this.setState({ currentPage: 1 });
    this.fetchEmployees();
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  render() {
    return (
      <div>
        <div
          className={`filter d-flex flex-wrap justify-content-between px-4 py-2 flex-row align-items-center`}
        >
          <form className="form-inline  d-flex flex-row flex-wrap align-items-center gap-3">
            <div>
              <label className="form-label">Employee name</label>
              <BaseInput
                label="Name"
                placeholder="Filter by name"
                value={this.state.nameQuery}
                onChange={this.inputHandler}
              />
            </div>
          </form>
          <div className="py-2 d-flex flex-row justify-content-end">
            <button
              onClick={this.handleSearch}
              className="btn btn-dark ms-2"
              type="submit"
            >
              <p>
                <FontAwesomeIcon icon={faSearch} /> Search
              </p>
            </button>
          </div>
        </div>
        <div className={`d-flex flex-row justify-content-end mx-2`}></div>
        {/* employees */}
        <div className={`border shadow-sm mx-4 my-3 p-4`}>
          <div className="py-2">
            <h1>Employee List</h1>
          </div>
          {this.state.employees?.map((employee) =>
            employee?.id ? (
              <div key={employee.id} className="d-flex flex-col flex-wrap">
                {employee.id} {employee.name}
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
}

export default EmployeeListing;
