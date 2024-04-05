import React, { useState, ChangeEvent } from "react";

interface BaseInputProps {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
}

const BaseInput: React.FC<BaseInputProps> = ({ label, value, onChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="d-flex flex-column my-2">
      <div className="form-check form-switch">
        <input
          checked={isChecked}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          {label}
        </label>
      </div>
    </div>
  );
};

export default BaseInput;
