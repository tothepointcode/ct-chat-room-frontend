import { FC, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export interface AlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
}

const alertColors = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
  info: "bg-blue-100 text-blue-800 border-blue-400",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
};

const Alert: FC<AlertProps> = ({ message, type = "info", duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-20 left-10 right-10 flex items-center justify-between transition-all duration-500 ease-in-out
        px-4 py-2 border-l-4 md:px-5 md:py-3 md:border-l-5 rounded-md shadow-sm mb-4 mt-2 md:mt-3 max-w-sm mx-auto
        ${alertColors[type]}`}
    >
      <p className="text-sm md:text-base">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="text-slate-900/50 hover:text-slate-900 "
      >
        <XMarkIcon className="size-4" />
      </button>
    </div>
  );
};

export default Alert;
