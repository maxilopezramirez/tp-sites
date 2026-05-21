import { defineConfig } from "astro/config";

const isProd = process.env.PROD_BASE === "true";

export default defineConfig({
  base: isProd ? "/tp-sites/investors" : "/",
  server: { port: 4323, host: true },
});
