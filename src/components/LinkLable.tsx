import { LinkProps, Link as RouterLink } from "react-router-dom";

function LinkLabel({ className, ...otherProps }: LinkProps) {
  return (
    <div>
      <RouterLink
        className={` bg-slate-50 hover:bg-gray-100 visited:hover: text-black ${className}`}
        {...otherProps}
      />
    </div>
  );
}

export default LinkLabel;
