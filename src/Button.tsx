import type { ButtonVariant, Digit, Operation } from "./types";

interface ButtonProps {
  readonly value: Digit | Operation | "=" | "C" | ".";
  readonly onClick: (value: Digit | Operation | "=" | "C" | ".") => void;
  readonly variant?: ButtonVariant;
  readonly className?: string;
}

const Button = ({
  value,
  onClick,
  variant = "default",
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "rounded-lg font-semibold text-xl transition-all duration-150 active:scale-95 hover:brightness-110 min-h-[60px]";

  const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-slate-600 text-white shadow-md hover:bg-slate-500",
    operation: "bg-orange-500 text-white shadow-md hover:bg-orange-400",
    equals: "bg-green-500 text-white shadow-md hover:bg-green-400",
    clear: "bg-red-500 text-white shadow-md hover:bg-red-400",
    active:
      "bg-blue-500 text-white shadow-md hover:bg-blue-400 ring-2 ring-white",
  };

  return (
    <button
      onClick={() => onClick(value)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
