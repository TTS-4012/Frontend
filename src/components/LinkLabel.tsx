import { LinkProps, Link as RouterLink } from "react-router-dom";

function LinkLabel({ className, ...otherProps }: LinkProps) {
  return (
    <label className={` text-black${className}`}>
      <RouterLink {...otherProps} />
    </label>
  );
}

export default LinkLabel;
