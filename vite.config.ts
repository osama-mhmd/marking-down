import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "marking-down",
      fileName: "marking-down",
    },
    // rollupOptions: {
    //   external: ["react"],
    // },
  },
});
