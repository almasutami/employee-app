import React from "react";
import BaseInput from "./base-input.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface BaseInputSearchProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const BaseInputSearch: React.FC<BaseInputSearchProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div style={{ position: "relative" }} className="align-items-center">
      <BaseInput
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
      />
      <FontAwesomeIcon
        icon={faSearch}
        size="sm"
        style={{
          color: "#525252",
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default BaseInputSearch;
