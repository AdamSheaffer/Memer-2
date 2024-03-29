/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), checker({ vueTsc: true }), svgLoader()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
