// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetAttributify()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "src/**/*.{js,ts}"
      ]
      // exclude files
      // exclude: []
    }
  }
});
