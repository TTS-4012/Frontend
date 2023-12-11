import { ForwardedRef, LabelHTMLAttributes, forwardRef } from "react";

type PropsType = LabelHTMLAttributes<HTMLLabelElement> & {
  link: string;
  size: "sm" | "md" | "lg";
};

const LinkLable = forwardRef(({ link, size, className, ...otherprops }: PropsType, ref: ForwardedRef<HTMLLabelElement>) => {
  return (
    <div>
      <label
        className={`
        ${
          {
            sm: "rounded-md px-3 py-2 text-sm",
            md: "rounded-md px-4 py-2 text-sm",
            lg: "rounded-md px-4 py-2 text-base",
          }[size]
        } ${className}`}
        {...otherprops}
        ref={ref}
      />
    </div>
  );
});

export default LinkLable;
