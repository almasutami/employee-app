import React, { useState } from "react";
import BaseInput from "../global/base-input.tsx";
import BaseSwitch from "../global/base-switch.tsx";
import { Employee } from "../../pages/employee-list.tsx";

interface EditEmployeeProps {
  employee: Employee | null;
  mode: "edit" | "delete";
  onClose: () => void;
  onSave?: (value: Employee) => void;
  onDelete?: (value: Employee) => void;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({
  employee,
  mode,
  onClose,
  onSave,
  onDelete,
}) => {
  const [employeeForm, setEmployeeForm] = useState<Employee | null>(employee);

  const updateEmployee = (prop: string, value: string | boolean) => {
    const newEmployeeForm = {
      ...employeeForm,
      [prop]: value,
    } as Employee;
    setEmployeeForm(newEmployeeForm);
  };

  if (mode === "edit") {
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
                value={employeeForm?.name || ""}
                label="Name"
                placeholder="Enter employee name"
                onChange={(value) => updateEmployee("name", value)}
              />
              <BaseInput
                value={employeeForm?.email || ""}
                label="Email"
                placeholder="Enter employee email"
                onChange={(value) => updateEmployee("email", value)}
              />
              <BaseSwitch
                label="Active employee"
                value={employeeForm?.isActive || false}
                onChange={(value) => updateEmployee("isActive", value)}
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
                onClick={
                  onSave ? () => onSave(employeeForm as Employee) : () => {}
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "delete") {
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
              <h5 className="modal-title">Delete confirmation</h5>
              <button
                type="button"
                className="btn btn-close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              Are you sure to delete this employee?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                style={{ fontSize: "14px" }}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ fontSize: "14px" }}
                onClick={
                  onDelete ? () => onDelete(employeeForm as Employee) : () => {}
                }
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditEmployee;
