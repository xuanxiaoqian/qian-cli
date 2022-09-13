import { defineConfig, loadEnv } from "vite";
<<<<<<< HEAD
import vueJsx from "@vitejs/plugin-vue";
=======
import vue from "@vitejs/plugin-vue";
>>>>>>> 6a5421b6d689a18028cb9109d022695442b043c2
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

const config = loadEnv("development", "./");

export default defineConfig({
  plugins: [
<<<<<<< HEAD
    vueJsx(),
=======
    vue(),
>>>>>>> 6a5421b6d689a18028cb9109d022695442b043c2
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
