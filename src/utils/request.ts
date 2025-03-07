import Request from "luch-request";
import { ApiBaseUrl } from "@/enums/index";
import { WHITE_LIST } from "@/constants";
import { useUserStore } from "@/stores/user";
import { toast } from "@/utils/toast";
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
        uni.redirectTo({ url: "/pages/login/login" });
        toast.error("未登录");
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
        } catch (error) {
          userStore.logout();
          toast.error(`登录凭证已过期，请重新登录:${error}`);
          return Promise.reject(`登录凭证已过期，请重新登录:${error}`);
        }
      }
      config.header = {
        ...config.header,
        Authorization: `Bearer ${userStore.token}`,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  http.interceptors.response.use(
    (response) => {
      const { data } = response;

      if (data.code === 200 || data.status === "1") {
        return data;
      }

      toast.error(data.message || "请求失败");
      return Promise.reject(data);
    },
    (error) => {
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        const userStore = useUserStore();
        // token 过期，清除用户信息并跳转到登录页
        userStore.logout();
      } else {
        toast.error("网络异常，请稍后重试");
      }
      return Promise.reject(error);
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
