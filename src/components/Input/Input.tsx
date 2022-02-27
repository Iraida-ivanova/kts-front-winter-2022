import React from "react";

import styles from "./Input.module.scss";

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
