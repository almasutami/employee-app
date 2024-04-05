import React, { ChangeEvent, Component } from "react";

interface BaseInputProps {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
}

class BaseInput extends Component<BaseInputProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  render() {
    const { label, value } = this.props;

    return (
      <div className="d-flex flex-column my-2">
        <div className="form-check form-switch">
          <input
            checked={value}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={this.handleChange}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {label}
          </label>
        </div>
      </div>
    );
  }
}

export default BaseInput;
