import { useState, useRef } from "preact/hooks";
import clsx from "clsx";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: Event) => void;
  onBlur?: (e: Event) => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  placeholder,
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPassword = type === "password";

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-base font-medium text-gray-800 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onInput={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setFocused(true)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={clsx(
            "px-3 py-2 rounded-md border outline-none transition-all w-full",
            "bg-white text-gray-900",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500",
            focused && !error && "ring-2 ring-blue-100",
            isPassword ? "pr-10" : ""
          )}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              // Ojo abierto
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              // Ojo cerrado
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.252A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3l18 18"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      <div
        className={clsx(
          "min-h-[20px] transition-all duration-300",
          error
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        {error && (
          <span className="text-xs text-red-500 animate-fade-in">{error}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
