import React from "react";

import styles from "./Input.module.scss";

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(Input);
