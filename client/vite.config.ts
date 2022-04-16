import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePlugin } from "vite-esbuild-typescript-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    VitePlugin({
      vite: {
        overlay: true,
      },
      checker: {
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: "@vue/compiler-sfc",
            },
          },
        },
      },
    }),
  ],
});
