import { card } from "../../../styled-system/recipes";

export default function Card({ children, variant = "canvas", className = "" }) {
  return <div className={`${card({ variant })} ${className}`}>{children}</div>;
}
