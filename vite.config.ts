import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ["tests/unit/**/*.spec.ts"],
    environment: "jsdom",
  },
});
