import Request from "luch-request";
import { ApiBaseUrl } from "@/enums/index";
import { WHITE_LIST } from "@/constants";
import { useUserStore } from "@/stores/user";
import { toast as $toast } from "@/utils/toast";

// 添加一个全局标志，用于防止重复跳转
let isRedirecting = false;
// 创建请求实例的工厂函数
const createRequest = (baseURL: string) => {
  const http = new Request({
    baseURL,
    timeout: 10000,
    header: {
      "Content-Type": "application/json",
    },
  });
  // 请求拦截器
  http.interceptors.request.use(
    async (config) => {
      const userStore = useUserStore();
      const inWhitelist = WHITE_LIST.some((path) => config.url?.includes(path));

      // 优先处理白名单请求
      if (inWhitelist) return config;
      // 校验登录状态
      if (!userStore.isLoggedIn) {
        // 使用全局标志防止重复跳转
        if (!isRedirecting) {
          isRedirecting = true;
          // 使用防抖函数，确保只执行一次跳转
          uni.reLaunch({
            url: "/pages/login/login",
            complete: () => {
              // 重置全局标志
              isRedirecting = false;
            },
          });
          // 确保 $toast 存在再调用 error，且只提示一次
        }
        $toast?.error("未登录");
        return Promise.reject("未登录");
      }

      // 检查token有效性
      if (!userStore.checkTokenValidity()) {
        try {
          await userStore.refreshToken();
          config.header = {
            ...config.header,
            Authorization: `Bearer ${userStore.token}`,
          };
        } catch {
          userStore.logout();
          $toast?.error(`请重新登录`);
          return Promise.reject("请重新登录");
        }
      }
      config.header = {
        ...config.header,
        Authorization: `Bearer ${userStore.token}`,
      };
      return config;
    },
    () => {
      $toast?.error("发起请求失败");
      return Promise.reject("发起请求失败");
    }
  );

  // 响应拦截器
  http.interceptors.response.use(
    (response) => {
      const { data } = response;

      if (data.code === 200 || data.status === "1") {
        return data;
      } else if (data.code === 401 || data.code === 403) {
        const userStore = useUserStore();
        // token 过期，清除用户信息并跳转到登录页
        userStore.logout();
        $toast?.error(data.message || "请求失败");
        return Promise.reject(data.message || "请求失败");
      }
    },
    (error) => {
      $toast?.error(
        typeof error === "string" ? error : error?.errMsg || "请求失败"
      );
      return Promise.reject(
        typeof error === "string" ? error : error?.errMsg || "请求失败"
      );
    }
  );

  return http;
};

// 创建不同服务的请求实例
const requests = {
  weather: createRequest(ApiBaseUrl.WEATHER),
  map: createRequest(ApiBaseUrl.MAP),
  user: createRequest(ApiBaseUrl.USER),
  // ... 其他服务的实例
};

// 封装请求方法的工厂函数
const createRequestMethods = (instance: Request) => ({
  get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
    return instance.get(url, { params });
  },

  post<T = unknown>(url: string, data?: Record<string, unknown>): Promise<T> {
    return instance.post(url, data);
  },

  put<T = unknown>(url: string, data?: Record<string, unknown>): Promise<T> {
    return instance.put(url, data);
  },

  delete<T = unknown>(url: string, data?: Record<string, unknown>): Promise<T> {
    return instance.delete(url, data);
  },
});

// 导出不同服务的请求方法
export const request = {
  weather: createRequestMethods(requests.weather),
  map: createRequestMethods(requests.map),
  user: createRequestMethods(requests.user),
  // ... 其他服务的请求方法
};

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export default request;
