import React, { ChangeEvent, Component } from "react";

interface BaseInputProps {
  label: string;
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
      <div>
        <label>{label}</label>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default BaseInput;
