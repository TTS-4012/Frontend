import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const Button = forwardRef(({ size, className, ...buttonProps }: PropsType, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      className={`inline-flex items-center border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${
          {
            xs: "rounded px-2.5 py-1.5 text-xs",
            sm: "rounded-md px-3 py-2 text-sm",
            md: "rounded-md px-4 py-2 text-sm",
            lg: "rounded-md px-4 py-2 text-base",
            xl: "rounded-md px-6 py-3 text-base",
          }[size]
        } ${className}`}
      {...buttonProps}
      ref={ref}
    />
  );
});

export default Button;
