import { input } from "../../../styled-system/recipes";

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  width = "120px",
  className = "",
  style = {},
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${input()} ${className}`}
      style={{ width, ...style }}
    />
  );
}
