import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslintPlugin from "vite-plugin-eslint";
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
  build:{
    transpileDependencies:["uview-ui"]
  },
  plugins: [
    AutoImport({
      imports: ["vue", "pinia", "uni-app"],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      dts: "./types/auto-imports.d.ts",
    }),
    uni(),
    eslintPlugin({
      cache: true,
      include: [
        "src/**/*.js",
        "src/**/*.vue",
        "src/*.js",
        "src/*.vue",
        "src/*.nvue",
      ],
      failOnError: false, // eslint报错不影响运行
    }),
  ],
});
