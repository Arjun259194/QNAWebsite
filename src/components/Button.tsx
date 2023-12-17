import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={`rounded-full border-2 py-0.5 px-6  capitalize transition-all hover:brightness-110 ${
        variant === "primary" ? "border-blue-500 bg-blue-500 text-blue-50" : "border-blue-500 bg-blue-50 text-blue-600"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
