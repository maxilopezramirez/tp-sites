import { defineConfig } from "astro/config";

const isProd = process.env.PROD_BASE === "true";

export default defineConfig({
  base: isProd ? "/tp-sites" : "/",
  server: { port: 4320, host: true },
});
