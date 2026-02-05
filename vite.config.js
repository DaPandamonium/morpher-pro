import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // Icon libraries are large but loaded on-demand
    rollupOptions: {
      output: {
        manualChunks: {
          // Split icon libraries into separate chunks (loaded on demand)
          "icons-lucide": ["lucide-react"],
          "icons-md": ["react-icons/md"],
          "icons-hi": ["react-icons/hi2"],
          "icons-bi": ["react-icons/bi"],
          "icons-fi": ["react-icons/fi"],
          // Core React vendor bundle
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
  },
});
