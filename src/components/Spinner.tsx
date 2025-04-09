import { FC } from "react";

interface SpinnerProps {
  variant?: "small";
}

const Spinner: FC<SpinnerProps> = ({ variant }) => {
  if (variant === "small") {
    return (
      <div className="w-6 h-6 border-3 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
    );
  }
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 border-4 md:border-5 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
  );
};

export default Spinner;
