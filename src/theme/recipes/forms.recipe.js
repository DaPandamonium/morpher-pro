import { defineRecipe } from "@pandacss/dev";

export const label = defineRecipe({
  className: "label",
  base: {
    fontSize: "0.58rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: "{colors.textDim}",
  },
});

export const input = defineRecipe({
  className: "input",
  base: {
    padding: "5px 10px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "{colors.text}",
    fontSize: "0.65rem",
    borderRadius: "5px",
    fontFamily: "{fonts.mono}",
    transition: "all 0.2s ease",
    _focus: {
      outline: "none",
      borderColor: "{colors.accentBorder}",
    },
  },
});

export const slider = defineRecipe({
  className: "slider",
  base: {
    width: "100%",
    accentColor: "{colors.accent}",
    cursor: "grab",
  },
});
