import { defineRecipe } from "@pandacss/dev";

export const segmentedControl = defineRecipe({
  className: "segmentedControl",
  base: {
    display: "inline-flex",
    background: "rgba(0,0,0,0.3)",
    borderRadius: "{radii.button}",
    padding: "2px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  variants: {
    flex: {
      true: { flex: 1 },
      false: { width: "fit-content" },
    },
  },
  defaultVariants: { flex: false },
});

export const segmentButton = defineRecipe({
  className: "segmentButton",
  base: {
    padding: "5px 16px",
    fontSize: "0.6rem",
    background: "transparent",
    border: "none",
    borderRadius: "{radii.sm}",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "{colors.textMuted}",
    fontWeight: 400,
  },
  variants: {
    active: {
      true: {
        background: "{colors.accentMuted}",
        color: "{colors.text}",
        fontWeight: 600,
      },
      false: {
        background: "transparent",
        color: "{colors.textMuted}",
        fontWeight: 400,
      },
    },
    size: {
      sm: { padding: "5px 12px", fontSize: "0.58rem", flex: 1 },
      md: { padding: "5px 16px", fontSize: "0.6rem" },
    },
  },
  defaultVariants: { active: false, size: "md" },
});
