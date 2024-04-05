import React, { useState, ChangeEvent } from "react";

interface BaseInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

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
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BaseInput;
