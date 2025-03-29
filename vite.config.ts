import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
  ],
  base: "/4sr",
  resolve: {
    alias: {
      "@/*": "src/*",
    },
  },
});
