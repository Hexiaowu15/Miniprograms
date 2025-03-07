import { defineStore } from "pinia";

import { userApi } from "@/api/user";

import type { LoginParams } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: uni.getStorageSync("token") || "",
    userInfo: uni.getStorageSync("userInfo") || null,
    isLoggedIn: !!uni.getStorageSync("token"),
    expires: uni.getStorageSync("tokenExpires") || 0,
    refreshToken: uni.getStorageSync("refreshToken") || "",
    refreshExpires: uni.getStorageSync("refreshExpires") || 0,
  }),

  actions: {
    /** 登录方法*/
    async login(params: LoginParams) {
      try {
        // 调用微信登录API
        const res = await userApi.login(params);

        // 处理登录响应
        if (res.code === 200) {
          this.token = res.data.token;
          this.userInfo = res.data.userInfo;
          this.isLoggedIn = true;
          this.expires = Date.now() + res.data.expires_in * 1000;
          this.refreshToken = res.data.refresh_token;
          this.refreshExpires = Date.now() + res.data.refresh_expires_in * 1000;

          // 持久化存储
          uni.setStorageSync("token", res.data.token);
          uni.setStorageSync("userInfo", res.data.userInfo);
          uni.setStorageSync("tokenExpires", this.expires);
          uni.setStorageSync("refreshToken", this.refreshToken);
          uni.setStorageSync("refreshExpires", this.refreshExpires);

          return Promise.resolve(res.data);
        }
        return Promise.reject(new Error(res.message));
      } catch (err) {
        this.logout();
        return Promise.reject(err);
      }
    },
    /** 退出登录跳转到登录页*/
    logout() {
      this.$reset();
      uni.removeStorageSync("token");
      uni.removeStorageSync("userInfo");
      uni.removeStorageSync("tokenExpires");
      uni.reLaunch({ url: "/pages/login/login" });
    },
    /** 检查 token 是否有效*/
    checkTokenValidity() {
      return this.isLoggedIn && Date.now() < this.expires;
    },
    /** 使用refreshToken刷新token*/
    async refreshToken() {
      try {
        const res = await userApi.refreshToken(this.refreshToken);
        this.token = res.data.token;
        this.expires = Date.now() + res.data.expires_in * 1000;
        this.refreshToken = res.data.refresh_token;
        this.refreshExpires = Date.now() + res.data.refresh_expires_in * 1000;

        uni.setStorageSync("token", this.token);
        uni.setStorageSync("tokenExpires", this.expires);
        uni.setStorageSync("refreshToken", this.refreshToken);
        uni.setStorageSync("refreshExpires", this.refreshExpires);
      } catch (error) {
        this.logout();
        return Promise.reject(error);
      }
    },
  },
});
