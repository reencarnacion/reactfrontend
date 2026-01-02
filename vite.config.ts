import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import flowbiteReact from "flowbite-react/plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    // [추가] 개발 중 /api 요청을 Spring Boot 서버로 전달
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot 로컬
        changeOrigin: true, // 호스트 헤더 변경
        secure: false,
      },
      "/files": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
