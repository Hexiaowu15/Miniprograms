import { ROUTE_WHITE_LIST } from "@/constants";
import { useUserStore } from "@/stores/user";
import { toast } from "./toast";
/** 路由拦截器*/
export function setupRouteInterceptor() {
  // 拦截所有导航方法
  const navigationMethods = [
    "navigateTo",
    "redirectTo",
    "reLaunch",
    "switchTab",
  ];

  navigationMethods.forEach((method) => {
    uni.addInterceptor(method, {
      invoke(args) {
        const url = args.url.split("?")[0];
        const inWhitelist = ROUTE_WHITE_LIST.some((path) => url.includes(path));

        if (inWhitelist) return true;

        const userStore = useUserStore();
        if (!userStore.isLoggedIn || !userStore.checkTokenValidity()) {
          uni.navigateTo({
            url: "/pages/login/login",
          });
          toast?.error("未登录");
          return false;
        }
        return true;
      },
      fail(err) {
        console.error(`${method}跳转失败:`, err);
        toast?.error(`${method}跳转失败:`);
      },
    });
  });

  // 添加应用启动拦截
  checkInitialRoute();
}

// 检查初始路由
function checkInitialRoute() {
  // 应用刚启动时可能还没有页面
  setTimeout(() => {
    const userStore = useUserStore();

    // 如果用户未登录且当前不在白名单页面
    if (!userStore.isLoggedIn || !userStore.checkTokenValidity()) {
      const currentPage = getCurrentPages()[0];
      if (currentPage) {
        const currentRoute = `/${currentPage.route}`;
        const inWhitelist = ROUTE_WHITE_LIST.some((path) =>
          currentRoute.includes(path)
        );

        if (!inWhitelist) {
          // 跳转到登录页
          uni.navigateTo({
            url: "/pages/login/login",
          });
          toast?.error("未登录");
        }
      }
    }
  }, 100);
}
