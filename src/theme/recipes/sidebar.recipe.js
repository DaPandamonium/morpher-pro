import { defineRecipe } from "@pandacss/dev";

export const drawer = defineRecipe({
  className: "drawer",
  base: {
    width: "300px",
    borderRight: "1px solid {colors.border}",
    background: "{colors.surface}",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

export const categoryHeader = defineRecipe({
  className: "categoryHeader",
  base: {
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "none",
    padding: "14px 4px",
    color: "{colors.textDim}",
    fontSize: "0.65rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "{radii.sm}",
    _hover: { color: "{colors.text}", background: "rgba(255, 255, 255, 0.02)" },
  },
});

export const presetCard = defineRecipe({
  className: "presetCard",
  base: {
    width: "100%",
    textAlign: "left",
    padding: "10px 12px",
    background: "transparent",
    border: "1px solid transparent",
    borderRadius: "{radii.button}",
    color: "{colors.text}",
    marginBottom: "2px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "0.85rem",
    fontWeight: 500,
    _hover: {
      borderColor: "{colors.borderHover}",
      color: "{colors.text}",
      background: "rgba(255, 255, 255, 0.05)",
    },
  },
  variants: {
    active: {
      true: {
        background: "{colors.accentMuted}",
        color: "{colors.accent}",
        borderColor: "{colors.accentBorder}",
      },
      false: {},
    },
  },
  defaultVariants: { active: false },
});
