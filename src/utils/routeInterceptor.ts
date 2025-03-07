import { ROUTE_WHITE_LIST } from "@/constants";
import { useUserStore } from "@/stores/user";
/** 路由拦截器*/
export function setupRouteInterceptor() {
  uni.addInterceptor("navigateTo", {
    invoke(args) {
      const url = args.url.split("?")[0];
      const inWhitelist = ROUTE_WHITE_LIST.some((path) => url.includes(path));

      if (inWhitelist) return true;

      const userStore = useUserStore();
      if (!userStore.isLoggedIn || !userStore.checkTokenValidity()) {
        uni.redirectTo({
          url: "/pages/login/login",
        });
        return false;
      }
      return true;
    },
    fail(err) {
      console.error("路由跳转失败:", err);
    },
  });
}
