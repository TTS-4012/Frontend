import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "normal" | "inline";
};

const Button = forwardRef(
  ({ size, variant, className, ...buttonProps }: PropsType, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        className={`inline-flex items-center border border-transparent font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          {
            xs: "rounded-md px-2.5 py-1.5 text-sm",
            sm: "rounded-md px-3 py-2 text-sm",
            md: "rounded-md px-4 py-2 text-sm",
            lg: "rounded-md px-4 py-2 text-base",
            xl: "rounded-md px-6 py-3 text-base",
          }[size]
        }
        ${
          {
            normal: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-500",
            inline: "rounded-md px-3 py-2 text-sm",
          }[variant ?? "normal"]
        } ${className}`}
        {...buttonProps}
        ref={ref}
      />
    );
  },
);

export default Button;
