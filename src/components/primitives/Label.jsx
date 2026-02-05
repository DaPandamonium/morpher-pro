import { label } from "../../../styled-system/recipes";

export default function Label({ children, className = "" }) {
  return <span className={`${label()} ${className}`}>{children}</span>;
}
