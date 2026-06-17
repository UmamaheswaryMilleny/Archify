
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" ;
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseClass ='btn';
  const variantclass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const fullWidthClass = fullWidth?'btn--full':'';

  const combinedClasses = [
    baseClass,variantclass,sizeClass,fullWidthClass,className
  ].filter(Boolean).join(' ')

  return (
    <button {...props} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;
