import type { ComponentChildren } from "preact";
import clsx from "clsx";

interface ButtonProps {
  children: ComponentChildren;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: (e: Event) => void;
}

const Button = ({
  children,
  type = "button",
  disabled,
  className = "",
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      "w-full py-2 px-4 rounded-md font-semibold transition-colors",
      "bg-blue-600 text-white hover:bg-blue-700",
      "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed",
      className
    )}
  >
    {children}
  </button>
);

export default Button;
