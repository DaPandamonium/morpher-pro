import { defineRecipe } from "@pandacss/dev";

// Layout container recipes for common patterns
export const viewport = defineRecipe({
  className: "viewport",
  base: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: { base: "40px 16px", md: "20px" },
    backgroundImage: "radial-gradient({colors.border} 1px, transparent 1px)",
    backgroundSize: "30px 30px",
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
    width: "100%",
  },
  variants: {
    align: {
      top: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export const controlRow = defineRecipe({
  className: "controlRow",
  base: {
    display: "flex",
    gap: "{spacing.md}",
    alignItems: "center",
  },
  variants: {
    wrap: {
      true: { flexWrap: "wrap" },
      false: { flexWrap: "nowrap" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      center: { justifyContent: "center" },
    },
  },
  defaultVariants: {
    wrap: false,
    justify: "start",
  },
});

export const controlGrid = defineRecipe({
  className: "controlGrid",
  base: {
    display: "grid",
    gridTemplateColumns: { base: "1fr", md: "70px 1fr" },
    gap: "10px 12px",
    alignItems: "center",
    marginBottom: "{spacing.lg}",
  },
});

export const progressRow = defineRecipe({
  className: "progressRow",
  base: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "{spacing.sm}",
    fontSize: "0.65rem",
    color: "{colors.textSubtle}",
    fontFamily: "{fonts.mono}",
  },
});

export const easingSection = defineRecipe({
  className: "easingSection",
  base: {
    marginTop: "20px",
    borderTop: "1px solid {colors.border}",
    paddingTop: "15px",
  },
});

export const easingLabel = defineRecipe({
  className: "easingLabel",
  base: {
    display: "block",
    fontSize: "0.7rem",
    color: "{colors.textDim}",
    marginBottom: "{spacing.sm}",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 700,
  },
});

export const easingButtons = defineRecipe({
  className: "easingButtons",
  base: {
    display: "flex",
    gap: "{spacing.sm}",
    flexWrap: "wrap",
  },
});

export const previewSvg = defineRecipe({
  className: "previewSvg",
  base: {
    width: { base: "80%", md: "60%" },
    maxWidth: "100%",
    height: "auto",
    aspectRatio: "1",
    filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.2))",
  },
});
