import { LinkProps, Link as RouterLink } from "react-router-dom";

function LinkLabel({ className, ...otherProps }: LinkProps) {
  return (
    <div>
      <RouterLink
        className={` bg-slate-50 visited:bg-blue-400 hover:bg-blue-300 visited:hover: text-black ${className}`}
        {...otherProps}
      />
    </div>
  );
}

export default LinkLabel;
