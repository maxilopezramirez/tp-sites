import { defineConfig } from "astro/config";

const isProd = process.env.PROD_BASE === "true";

export default defineConfig({
  base: isProd ? "/tp-sites/platform" : "/",
  server: { port: 4322, host: true },
});
