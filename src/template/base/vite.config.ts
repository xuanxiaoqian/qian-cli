import { defineConfig, loadEnv } from "vite";
import vueJsx from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

const config = loadEnv("development", "./");

export default defineConfig({
  plugins: [
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "types/auto-import.d.ts",
    }),
  ],

  server: {
    host: "0.0.0.0",
    port: 3000,
    open: false,
    base: "./",
    proxy: {
      "^/api": {
        target: config.VITE_APP_BASE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
