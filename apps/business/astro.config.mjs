import { defineConfig } from "astro/config";

const isProd = process.env.PROD_BASE === "true";
const base = isProd ? "/tp-sites/business" : "";

export default defineConfig({
  base: isProd ? "/tp-sites/business" : "/",
  server: { port: 4321, host: true },
  redirects: {
    "/servicios/ferias": `${base}/servicios/festivales`,
  },
});
