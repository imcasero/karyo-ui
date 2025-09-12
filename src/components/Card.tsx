import type { ComponentChildren } from "preact";

interface CardProps {
  children: ComponentChildren;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 w-full max-w-md ${className}`}
  >
    {children}
  </div>
);

export default Card;
