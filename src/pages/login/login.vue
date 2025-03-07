<template>
  <view class="login-container">
    <view class="login-header">
      <wd-icon name="wechat" size="80px" color="#09BB07"></wd-icon>
      <text class="title">微信一键登录</text>
    </view>

    <wd-button type="success" shape="round" block @click="handleWechatLogin" custom-class="login-btn">
      微信快捷登录
    </wd-button>

    <text class="agreement-text">登录即表示同意《用户协议》和《隐私政策》</text>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api/user'
const handleWechatLogin = async () => {
  try {
    // 调用封装好的微信授权方法
    const authRes = await userApi.wechatAuth();

    // 调用store保存用户信息
    const userStore = useUserStore()
    await userStore.login(authRes);

    // 登录成功后跳转首页
    uni.switchTab({
      url: '/pages/index/index'
    })

  } catch (err) {
    uni.showToast({
      title: '登录失败',
      icon: 'none'
    })
    console.error('微信登录失败:', err)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 60rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f8f8;

  .login-header {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 36rpx;
      color: #333;
      margin-top: 40rpx;
    }
  }

  .login-btn {
    margin-top: 80rpx;
    background: #09BB07 !important;
    color: white !important;
  }

  .agreement-text {
    font-size: 24rpx;
    color: #999;
    margin-top: 60rpx;
  }
}
</style>@/store/user