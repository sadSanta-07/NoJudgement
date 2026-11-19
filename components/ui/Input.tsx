"use client";

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1d1c1a] tracking-tight"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-[#fcfbf8] text-[#1d1c1a] placeholder:text-[#a39a8e] border ${
            error ? "border-red-500" : "border-[rgba(29,28,26,0.12)]"
          } rounded-[5px] px-3.5 py-2.5 text-base transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#1d1c1a] focus:ring-offset-2 disabled:opacity-40 disabled:bg-[#f5f3ee] disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-[#6a625a] mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
