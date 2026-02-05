import {
  segmentedControl,
  segmentButton,
} from "../../../styled-system/recipes";
import { css } from "../../../styled-system/css";

// Override styles for active state
const activeStyle = css({
  background: "rgba(168, 85, 247, 0.25)",
  color: "#E9D5FF",
  fontWeight: 600,
});

export default function SegmentedControl({
  options,
  value,
  onChange,
  flex = false,
  size = "md",
}) {
  return (
    <div className={segmentedControl({ flex })}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            className={`${segmentButton({ active: isActive, size })} ${isActive ? activeStyle : ""}`}
            onClick={() => onChange(option.value)}
            title={option.title}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
