import { button } from "../../../styled-system/recipes";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button className={`${button({ variant, size })} ${className}`} {...props}>
      {children}
    </button>
  );
}
