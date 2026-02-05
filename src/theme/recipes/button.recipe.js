import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  base: {
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
    borderRadius: "{radii.button}",
  },
  variants: {
    variant: {
      primary: {
        background: "{colors.accent}",
        border: "none",
        color: "white",
        padding: "0 24px",
        height: "40px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        _hover: { filter: "brightness(1.1)" },
      },
      secondary: {
        background: "transparent",
        border: "1px solid {colors.borderHover}",
        color: "{colors.textMuted}",
        padding: "0 20px",
        height: "36px",
        fontSize: "0.8rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        _hover: {
          borderColor: "{colors.borderActive}",
          color: "{colors.text}",
        },
      },
      ghost: {
        background: "transparent",
        border: "none",
        color: "{colors.textMuted}",
        padding: "0 12px",
        height: "32px",
        fontSize: "0.75rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        _hover: { color: "{colors.text}" },
      },
    },
    size: {
      sm: { height: "32px", padding: "0 12px", fontSize: "0.75rem" },
      md: { height: "40px", padding: "0 24px", fontSize: "0.875rem" },
      lg: { height: "48px", padding: "0 32px", fontSize: "1rem" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
