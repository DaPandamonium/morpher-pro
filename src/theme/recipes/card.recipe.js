import { defineRecipe } from "@pandacss/dev";

export const card = defineRecipe({
  className: "card",
  base: {
    background: "{colors.card}",
    border: "1px solid {colors.border}",
  },
  variants: {
    variant: {
      canvas: {
        width: "100%",
        maxWidth: "400px",
        aspectRatio: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "{radii.card}",
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5)",
        margin: "0 auto",
      },
      controls: {
        width: "100%",
        maxWidth: "400px",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "{radii.control}",
        margin: "30px auto 0",
      },
      sidebar: {
        padding: "20px",
        borderRadius: "{radii.md}",
      },
    },
  },
});
