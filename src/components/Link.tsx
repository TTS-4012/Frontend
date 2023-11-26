import { LinkProps, Link as RouterLink } from "react-router-dom";

function Link({ className, ...otherProps }: LinkProps) {
  return (
    <RouterLink
      className={`text-indigo-700 visited:text-violet-700 hover:text-indigo-800 visited:hover:text-violet-800 ${className}`}
      {...otherProps}
    />
  );
}
export default Link;
