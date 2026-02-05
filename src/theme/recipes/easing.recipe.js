import { defineRecipe } from "@pandacss/dev";

export const easingButton = defineRecipe({
  className: "easingButton",
  base: {
    flex: 1,
    background: "transparent",
    border: "1px solid {colors.borderHover}",
    color: "{colors.textMuted}",
    padding: "6px 10px",
    fontSize: "0.7rem",
    borderRadius: "{radii.button}",
    cursor: "pointer",
    textTransform: "capitalize",
    transition: "0.2s",
    _hover: { borderColor: "{colors.textDim}", color: "{colors.text}" },
  },
  variants: {
    active: {
      true: {
        background: "{colors.accent}",
        borderColor: "{colors.accent}",
        color: "white",
      },
      false: {},
    },
    isStop: {
      true: {
        background: "{colors.error}",
        borderColor: "{colors.error}",
        color: "white",
      },
      false: {},
    },
  },
  defaultVariants: { active: false, isStop: false },
});
