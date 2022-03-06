import React from "react";

import styles from "./Button.module.scss";
type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  // eslint-disable-next-line no-console
  console.log("button render");
  return (
    <button
      className={styles.searchButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
