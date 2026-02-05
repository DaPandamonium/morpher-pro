import { defineRecipe } from "@pandacss/dev";

export const colorSwatch = defineRecipe({
  className: "colorSwatch",
  base: {
    position: "relative",
    borderRadius: "5px",
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: { width: "24px", height: "24px" },
      md: { width: "28px", height: "28px" },
      lg: { width: "32px", height: "32px" },
    },
  },
  defaultVariants: { size: "md" },
});
