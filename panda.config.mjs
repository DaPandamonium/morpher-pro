import { defineConfig } from "@pandacss/dev";
import * as recipes from "./src/theme/recipes/index.js";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",

  // Ensure variant CSS is always generated for dynamic usage
  staticCss: {
    recipes: {
      easingButton: [{ active: ["*"], isStop: ["*"] }],
      libraryButton: [{ active: ["*"] }],
      iconCard: [{ selected: ["*"] }],
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          // Base colors
          bg: { value: "#050505" },
          card: { value: "#111" },
          surface: { value: "#0a0a0a" },

          // Accent colors
          accent: { value: "#A855F7" },
          accentHover: { value: "#9333EA" },
          accentMuted: { value: "rgba(168, 85, 247, 0.15)" },
          accentBorder: { value: "rgba(168, 85, 247, 0.3)" },

          // Text colors
          text: { value: "#eee" },
          textMuted: { value: "#888" },
          textDim: { value: "#666" },
          textSubtle: { value: "#555" },

          // Border colors
          border: { value: "#222" },
          borderHover: { value: "#333" },
          borderActive: { value: "#444" },

          // UI State colors
          success: { value: "#22c55e" },
          error: { value: "#dc2626" },
          warning: { value: "#f59e0b" },

          // Code/syntax colors
          codeBg: { value: "#000" },
          codeText: { value: "#a5f3fc" },
        },
        fonts: {
          main: { value: "'Inter', system-ui, -apple-system, sans-serif" },
          mono: { value: "'JetBrains Mono', 'Fira Code', monospace" },
        },
        radii: {
          card: { value: "24px" },
          button: { value: "6px" },
          control: { value: "16px" },
          sm: { value: "4px" },
          md: { value: "8px" },
          lg: { value: "12px" },
        },
        spacing: {
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          xl: { value: "24px" },
        },
      },
      keyframes: {
        slideDown: {
          from: { opacity: 0, transform: "translateY(-5px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      recipes,
    },
  },

  globalCss: {
    "*": {
      boxSizing: "border-box",
      WebkitTapHighlightColor: "transparent",
    },
    body: {
      margin: 0,
      background: "{colors.bg}",
      color: "{colors.text}",
      fontFamily: "{fonts.main}",
      overflow: "hidden",
    },
    button: {
      fontFamily: "inherit",
    },
    textarea: {
      width: "100%",
      background: "#000",
      border: "1px solid {colors.border}",
      borderLeft: "2px solid #333",
      borderRadius: "4px",
      color: "#a5f3fc",
      fontFamily: "{fonts.mono}",
      fontSize: "0.7rem",
      padding: "10px",
      resize: "none",
      height: "70px",
      transition: "all 0.2s",
      lineHeight: 1.4,
      display: "block",
      _focus: {
        borderColor: "#333",
        borderLeftColor: "{colors.accent}",
        background: "#050505",
        outline: "none",
        boxShadow: "none",
      },
    },
  },
});
