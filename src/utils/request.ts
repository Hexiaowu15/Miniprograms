import Request from 'luch-request'
import { ApiBaseUrl } from '@/enums/index'

// 创建请求实例的工厂函数
const createRequest = (baseURL: string) => {
  const http = new Request({
    baseURL,
    timeout: 10000,
    header: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  http.interceptors.request.use(
    (config) => {
      // 这里可以添加token等通用请求头
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  http.interceptors.response.use(
    (response) => {
      const { data } = response
      
      if (data.code === 200) {
        return data.data
      }
      
      uni.showToast({
        title: data.message || '请求失败',
        icon: 'none'
      })
      return Promise.reject(data)
    },
    (error) => {
      uni.showToast({
        title: '网络异常，请稍后重试',
        icon: 'none'
      })
      return Promise.reject(error)
    }
  )

  return http
}

// 创建不同服务的请求实例
const requests = {
  weather: createRequest(ApiBaseUrl.WEATHER),
  map: createRequest(ApiBaseUrl.MAP),
  user: createRequest(ApiBaseUrl.USER),
  // ... 其他服务的实例
}

// 封装请求方法的工厂函数
const createRequestMethods = (instance: Request) => ({
  get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
    return instance.get(url, { params })
  },
  
  post<T = unknown>(url: string, data?: Record<string, unknown>): Promise<T> {
    return instance.post(url, data)
  },
  
  put<T = unknown>(url: string, data?: Record<string, unknown>): Promise<T> {
    return instance.put(url, data)
  },
  
  delete<T = unknown>(url: string, data?: Record<string, unknown>): Promise<T> {
    return instance.delete(url, data)
  }
})

// 导出不同服务的请求方法
export const request = {
  weather: createRequestMethods(requests.weather),
  map: createRequestMethods(requests.map),
  user: createRequestMethods(requests.user),
  // ... 其他服务的请求方法
}

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export default request 