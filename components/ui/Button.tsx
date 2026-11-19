"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "keycap"
  | "accent-orange"
  | "accent-purple"
  | "accent-teal"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1d1c1a] text-[#fbfaf7] border border-[#1d1c1a] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07),0_12px_24px_rgba(60,48,30,.07)] hover:bg-[#282725] active:translate-y-[1px]",
  secondary:
    "bg-[#f1efea] text-[#1d1c1a] border border-[#e8e6e1] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:bg-[#ffffff] hover:shadow-[rgba(29,28,26,0.05)_0px_0px_0px_1px_inset,rgba(60,48,30,0.1)_0px_8px_20px] active:translate-y-[1px]",
  ghost:
    "bg-transparent text-[#1d1c1a] border border-transparent hover:bg-[#1d1c1a]/[0.05] active:translate-y-[1px]",
  keycap:
    "bg-[#f1efea] text-[#1d1c1a] border border-[#e8e6e1] font-mono shadow-[0_1px_0_rgba(29,28,26,0.08)] hover:bg-[#ffffff] active:translate-y-[1px]",
  "accent-orange":
    "bg-[#d9b3a9] text-[#1d1c1a] border border-[#c99f94] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:brightness-105 active:translate-y-[1px]",
  "accent-purple":
    "bg-[#c9bcd6] text-[#1d1c1a] border border-[#b8a7c8] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:brightness-105 active:translate-y-[1px]",
  "accent-teal":
    "bg-[#99c1bb] text-[#1d1c1a] border border-[#83b0a9] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:brightness-105 active:translate-y-[1px]",
  danger:
    "bg-[#e0564c] text-white border border-[#c8443b] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:brightness-105 active:translate-y-[1px]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-[5px] gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-[5px] gap-2",
  lg: "px-6 py-3.5 text-base rounded-[6px] gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!isLoading && icon && iconPosition === "left" && icon}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
