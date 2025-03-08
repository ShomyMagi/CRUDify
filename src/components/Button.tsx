import "./Button.scss";

import React, { FC, MouseEventHandler, ReactNode } from "react";

type ButtonVariants = "primary" | "secondary" | "delete" | "back";
type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) => (
  <button
    className={`btn ${variant} ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    /* eslint-disable-next-line react/button-has-type */
    type={type}
  >
    {children}
  </button>
);
