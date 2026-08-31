import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Le site est publié sur https://tomvieilledent.github.io/tilleul_de_canac/
export default defineConfig({
  base: "/tilleul_de_canac/",
  plugins: [react()],
});
