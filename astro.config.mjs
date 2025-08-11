import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import react from "@astrojs/react";            // por si tenés alguna isla React
import critters from "astro-critters";
import compress from "astro-compress";

export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    react(),
    critters({ preload: "media", pruneSource: true }),
    compress({ HTML: true, CSS: true, JavaScript: true, SVG: true }),
  ],
});
