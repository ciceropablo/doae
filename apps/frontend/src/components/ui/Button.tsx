import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
