import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  integrations: [alpinejs()],
});
