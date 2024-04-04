import React, { ChangeEvent, Component } from "react";

interface BaseInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

class BaseInput extends Component<BaseInputProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const { label, value, placeholder } = this.props;

    return (
      <div className="d-flex flex-column my-2">
        {label && (
          <div className="fw-bolder" style={{ width: "100%" }}>
            <label>{label}</label>
          </div>
        )}
        <div style={{ width: "100%" }}>
          <input
            className="rounded border p-2"
            style={{ minWidth: "240px", width: "100%" }}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default BaseInput;
