import { defineRecipe } from "@pandacss/dev";

export const playgroundModal = defineRecipe({
  className: "playgroundModal",
  base: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
    zIndex: 1100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    animation: "fadeIn 0.2s ease-out",
  },
});

export const playgroundPanel = defineRecipe({
  className: "playgroundPanel",
  base: {
    width: "90vw",
    maxWidth: "1200px",
    height: "85vh",
    background: "#0a0a0a",
    border: "1px solid {colors.border}",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)",
  },
});

export const playgroundHeader = defineRecipe({
  className: "playgroundHeader",
  base: {
    padding: "24px 32px",
    borderBottom: "1px solid {colors.border}",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.02)",
  },
});

export const playgroundGrid = defineRecipe({
  className: "playgroundGrid",
  base: {
    flex: 1,
    padding: "32px",
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    },
    gap: "24px",
    alignContent: "start",
  },
});

export const componentCard = defineRecipe({
  className: "componentCard",
  base: {
    background: "#111",
    border: "1px solid {colors.border}",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    transition: "border-color 0.2s",
    _hover: {
      borderColor: "token(colors.accent)",
    },
  },
});

export const mockComponent = defineRecipe({
  className: "mockComponent",
  base: {
    padding: "12px 20px",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s",
    color: "#eee",
    fontSize: "0.9rem",
    fontWeight: 500,
    userSelect: "none",
    _hover: {
      background: "#222",
      borderColor: "#444",
      transform: "translateY(-1px)",
    },
    _active: {
      transform: "translateY(0)",
      background: "#151515",
    },
  },
});
