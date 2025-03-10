import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia"; // 修改为解构导入
import { setupRouteInterceptor } from "@/utils/routeInterceptor";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia(); // 创建pinia实例
  app.use(pinia);
  // 路由拦截器
  setupRouteInterceptor();

  
  return {
    app,
  };
}
