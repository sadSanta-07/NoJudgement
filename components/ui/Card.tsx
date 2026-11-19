"use client";

import React, { forwardRef } from "react";

export type CardVariant =
  | "surface"
  | "secondary"
  | "accent-orange"
  | "accent-purple"
  | "accent-teal"
  | "dark";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  surface: "bg-[#fcfbf8] text-[#1d1c1a] border-[#e8e6e1]",
  secondary: "bg-[#f5f3ee] text-[#1d1c1a] border-[#e8e6e1]",
  "accent-orange": "bg-[#d9b3a9] text-[#1d1c1a] border-[#cca196]",
  "accent-purple": "bg-[#c9bcd6] text-[#1d1c1a] border-[#bcaecb]",
  "accent-teal": "bg-[#99c1bb] text-[#1d1c1a] border-[#88b3ac]",
  dark: "bg-[#1d1c1a] text-[#fbfaf7] border-[#2c2a26]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "surface", interactive = false, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-[22px] border shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07),0_12px_24px_rgba(60,48,30,.07)] transition-all duration-200 ${variantStyles[variant]} ${
          interactive
            ? "hover:-translate-y-1 hover:shadow-[rgba(29,28,26,0.08)_0px_0px_0px_1px_inset,rgba(60,48,30,0.08)_0px_2px_4px,rgba(60,48,30,0.12)_0px_18px_34px] cursor-pointer"
            : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 sm:p-8 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-display text-2xl md:text-3xl font-normal tracking-tight text-inherit ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-[#6a625a] mt-1.5 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 sm:p-8 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-6 sm:p-8 pt-4 border-t border-[rgba(29,28,26,0.08)] flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
