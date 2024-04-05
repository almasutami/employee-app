import React from "react";
import { Employee } from "../../pages/employee-list";
import BaseInput from "../global/base-input.tsx";
import BaseSwitch from "../global/base-switch.tsx";

interface EditEmployeeProps {
  employee: Employee | null;
  onClose: () => void;
}

class EditEmployee extends React.Component<EditEmployeeProps> {
  state = {
    employeeForm: this.props?.employee as Employee | null,
  };

  updateEmployee = (prop: string, value: string | boolean) => {
    const newEmployeeForm = {
      ...this.state.employeeForm,
      [prop]: value,
    };
    this.setState({ employeeForm: newEmployeeForm });
  };

  render() {
    const { employee, onClose } = this.props;
    return (
      <div
        className="modal"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Edit {`${employee?.name}`}</h5>
              <button
                type="button"
                className="btn btn-close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <BaseInput
                value={this.state.employeeForm?.name || ""}
                label="Name"
                placeholder="Enter employee name"
                onChange={(value) => this.updateEmployee("name", value)}
              />
              <BaseInput
                value={this.state.employeeForm?.email || ""}
                label="Email"
                placeholder="Enter employee email"
                onChange={(value) => this.updateEmployee("email", value)}
              />
              <BaseSwitch
                label="Active employee"
                value={this.state.employeeForm?.isActive || false}
                onChange={(value) => this.updateEmployee("isActive", value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                style={{ fontSize: "14px" }}
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ fontSize: "14px" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditEmployee;
