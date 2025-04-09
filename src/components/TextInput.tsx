import { FC, InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends InputHTMLAttributes<any> {
  label?: string;
  icon?: ReactNode;
  variant?: "chat";
}

const TextInput: FC<TextInputProps> = ({
  name,
  placeholder,
  label,
  icon,
  variant,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-2 md:space-y-3 relative flex-1">
      {label && <label className="">{label}</label>}

      {icon && (
        <div className="size-6 md:size-7 text-sky-500 absolute left-3 bottom-1 md:left-4 md:bottom-1">
          {icon}
        </div>
      )}

      <input
        name={name}
        className={`${
          variant === "chat" ? "w-full" : ""
        } h-12 md:h-15 bg-slate-100 pl-13 pr-5 md:pl-15 rounded-xl focus:bg-sky-100 focus:outline-0 md:text-lg`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
