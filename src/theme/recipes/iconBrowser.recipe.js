import { defineRecipe } from "@pandacss/dev";

export const iconBrowserModal = defineRecipe({
  className: "iconBrowserModal",
  base: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
});

export const iconBrowserPanel = defineRecipe({
  className: "iconBrowserPanel",
  base: {
    background: "{colors.card}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.card}",
    width: { base: "100vw", md: "90vw" },
    maxWidth: "1200px",
    height: { base: "100dvh", md: "85vh" },
    maxHeight: { base: "100dvh", md: "85vh" },
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 50px 100px rgba(0,0,0,0.8)",
  },
});

export const iconBrowserHeader = defineRecipe({
  className: "iconBrowserHeader",
  base: {
    padding: { base: "12px 16px", md: "20px 24px" },
    borderBottom: "1px solid {colors.border}",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "{spacing.md}",
    flexWrap: "wrap",
    position: "relative", // Needed for absolute positioning of close button
  },
});

export const iconBrowserBody = defineRecipe({
  className: "iconBrowserBody",
  base: {
    flex: 1,
    display: "flex",
    flexDirection: { base: "column", md: "row" },
    overflow: "hidden",
  },
});

export const iconGrid = defineRecipe({
  className: "iconGrid",
  base: {
    padding: { base: "12px", md: "16px" },
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(auto-fill, minmax(70px, 1fr))",
      md: "repeat(auto-fill, minmax(80px, 1fr))",
    },
    gap: "{spacing.sm}",
    alignContent: "start",
    flex: 1,
  },
});

export const iconCard = defineRecipe({
  className: "iconCard",
  base: {
    padding: { base: "8px", md: "12px" },
    cursor: "pointer",
    borderRadius: "{radii.md}",
    border: "1px solid transparent",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    _hover: {
      background: "{colors.accentMuted}",
      borderColor: "{colors.accentBorder}",
    },
  },
  variants: {
    selected: {
      true: {
        background: "{colors.accentMuted} !important",
        borderColor: "{colors.accent}/50 !important",
      },
      false: {},
    },
  },
  defaultVariants: { selected: false },
});

export const iconPreviewPanel = defineRecipe({
  className: "iconPreviewPanel",
  base: {
    borderLeft: { base: "none", md: "1px solid {colors.border}" },
    borderTop: { base: "1px solid {colors.border}", md: "none" },
    padding: { base: "16px", md: "24px" },
    display: { base: "none", md: "flex" },
    flexDirection: "column",
    gap: "{spacing.xl}",
    background: "rgba(0,0,0,0.2)",
    width: { base: "100%", md: "350px" },
    flexShrink: 0,
  },
});

export const iconPreviewBox = defineRecipe({
  className: "iconPreviewBox",
  base: {
    width: "100%",
    aspectRatio: "1",
    background: "{colors.surface}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Library selector styles
export const librarySelector = defineRecipe({
  className: "librarySelector",
  base: {
    display: "flex",
    gap: "{spacing.xs}",
    flexWrap: "wrap",
  },
});

export const libraryButton = defineRecipe({
  className: "libraryButton",
  base: {
    padding: "6px 12px",
    borderRadius: "{radii.button}",
    border: "1px solid {colors.border}",
    background: "transparent",
    color: "{colors.textMuted}",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    _hover: {
      borderColor: "{colors.borderHover}",
      color: "{colors.text}",
    },
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
  },
  defaultVariants: { active: false },
});

// Loading state
export const iconLoadingState = defineRecipe({
  className: "iconLoadingState",
  base: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "{spacing.md}",
    color: "{colors.textMuted}",
    fontSize: "0.9rem",
  },
});
