import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface props {
  children: ReactNode;
  address: string;
  className: string;
}
function Link({ children, address, className }: props) {
  return (
    <RouterLink
      className={`text-indigo-700 visited:text-violet-700 hover:text-indigo-800 visited:hover:text-violet-800 ${className}`}
      to={address}>
      {" "}
      {children}
    </RouterLink>
  );
}
export default Link;
