import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    ({
      mozjpeg: {
        quality: 70,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      webp: {
        quality: 75,
      },
    }),
  ],
})
