import React from "react";
import "./Input.css";

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value);
  };
  return (
    <div>
      <input
        className="input-line__input"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
