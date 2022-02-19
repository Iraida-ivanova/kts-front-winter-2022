import "./Button.css";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      className="input-line__search-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
