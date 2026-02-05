import { slider } from "../../../styled-system/recipes";

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.001,
  ...props
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={slider()}
      {...props}
    />
  );
}
