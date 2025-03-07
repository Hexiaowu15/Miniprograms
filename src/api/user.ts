import { request } from "@/utils/request";
import type { ApiResponse } from "@/utils/request";

export type LoginParams = {
  code: string;
  userInfo: {
    encryptedData: string;
    iv: string;
    rawData?: string;
    signature?: string;
  };
};

export interface LoginResponse {
  token: string;
  userInfo: {
    openid: string;
    session_key: string;
    nickname?: string;
    avatarUrl?: string;
    gender?: number;
    city?: string;
  };
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export interface RefreshTokenResponse {
  token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export const userApi = {
  /**
   * 获取微信登录信息
   * @returns {Promise<LoginParams>}
   */
  async wechatAuth(): Promise<LoginParams> {
    const loginRes = await uni.login({ provider: "weixin" });
    const userInfo = await uni.getUserProfile({
      provider: "weixin",
      lang: "zh_CN",
    });
    return {
      code: loginRes.code,
      userInfo: {
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv,
        rawData: userInfo.rawData,
        signature: userInfo.signature
      }
    };
  },
  /**
   * 微信登录
   * @param {LoginParams} params 登录参数
   * @returns {Promise<ApiResponse<LoginResponse>>}
   */
  async login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
    try {
      return await request.user.post("/auth/wechat/login", params);
    } catch (err) {
      uni.showToast({
        title: "登录请求失败",
        icon: "none",
      });
      throw new Error("微信登录接口异常:", { cause: err });
    }
  },
  /**
   * 刷新令牌
   * @param {string} refreshToken 刷新令牌
   * @returns {Promise<ApiResponse<RefreshTokenResponse>>}
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      return await request.user.post("/auth/refresh", { refreshToken });
    } catch (err) {
      uni.showToast({
        title: "令牌刷新失败",
        icon: "none",
      });
      throw new Error("刷新令牌接口异常", { cause: err });
    }
  },
};
