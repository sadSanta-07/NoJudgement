"use client";

import React from "react";

export type BadgeVariant =
  | "keycap"
  | "default"
  | "orange"
  | "purple"
  | "teal"
  | "subtle"
  | "success"
  | "warning";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  keycap:
    "bg-[#f1efea] text-[#1d1c1a] border border-[#e8e6e1] font-mono shadow-[0_1px_0_rgba(29,28,26,0.08)]",
  default:
    "bg-[#1d1c1a] text-[#fbfaf7] border border-[#1d1c1a]",
  orange:
    "bg-[#d9b3a9] text-[#1d1c1a] border border-[#cca196]",
  purple:
    "bg-[#c9bcd6] text-[#1d1c1a] border border-[#bcaecb]",
  teal:
    "bg-[#99c1bb] text-[#1d1c1a] border border-[#88b3ac]",
  subtle:
    "bg-[#f5f3ee] text-[#5e5b55] border border-[#e8e6e1]",
  success:
    "bg-[#d8eedf] text-[#1e5d36] border border-[#b7dfc3]",
  warning:
    "bg-[#fee9d6] text-[#93450c] border border-[#fbd2b3]",
};

export function Badge({
  children,
  variant = "keycap",
  size = "sm",
  icon,
  className = "",
  ...props
}: BadgeProps) {
  const sizeClass =
    size === "sm"
      ? "text-xs px-2.5 py-1 rounded-[5px]"
      : "text-sm px-3 py-1.5 rounded-[6px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium leading-none select-none tracking-tight ${variantStyles[variant]} ${sizeClass} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
