import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
  ],
  base: "./", // Important for static file paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Fixed alias syntax
    },
  }, // CRUCIAL for GitHub Pages - replace with your repo name
  build: {
    assetsInlineLimit: 4096, // Files smaller than 4kb will be inlined as base64
    outDir: "dist",
    assetsDir: "assets", // Organizes assets in dist folder
  },
  server: {
    port: 3000,
  },
});
