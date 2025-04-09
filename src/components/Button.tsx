import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<any> {
  children: ReactNode;
  variant?: "small" | "plain";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  ...rest
}) => {
  return (
    <button
      className={`${
        variant === "small" ? "w-auto px-3 md:px-5" : "w-full px-10"
      }  h-12 md:h-15 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-sky-200 text-slate-50 flex justify-center items-center font-semibold md:text-lg`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
