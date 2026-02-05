import { colorSwatch } from "../../../styled-system/recipes";
import { css } from "../../../styled-system/css";

const hiddenInput = css({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer",
});

export default function ColorPicker({ value, onChange, size = "md", title }) {
  // Note: Inline style for background is intentional - it's a dynamic value
  return (
    <div className={colorSwatch({ size })} style={{ background: value }}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={hiddenInput}
        title={title}
      />
    </div>
  );
}
