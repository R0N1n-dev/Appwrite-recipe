import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import lightningcss from "vite-plugin-lightningcss";
import UnoCSS from "unocss/vite";
import VueDevTools from "vite-plugin-vue-devtools";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueDevTools(),
    vue(),
    UnoCSS(),
    Components(),
    lightningcss({
      browserslist: ">= 0.25%"
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
