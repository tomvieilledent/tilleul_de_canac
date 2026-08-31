import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Publié sur https://tomvieilledent.github.io/tilleul_de_canac/
export default defineConfig({
  base: "/tilleul_de_canac/",
  plugins: [react()],
  build: {
    // modulepreload est nativement supporté par les navigateurs ciblés :
    // pas de polyfill inline (compatibilité CSP script-src 'self').
    modulePreload: { polyfill: false },
    target: "es2020",
  },
});
