import { LinkProps, Link as RouterLink } from "react-router-dom";

function LinkLabel({ className, ...otherProps }: LinkProps) {
  return (
    <div>
      <RouterLink
        className={` visited:hover: bg-slate-50 text-black visited:bg-blue-400 hover:bg-blue-300 ${className}`}
        {...otherProps}
      />
    </div>
  );
}

export default LinkLabel;
