<template>
  <view class="container">
    <HomePage v-if="currentTab === 'home'" />
    <MyPage v-if="currentTab === 'profile'" />
    <!-- Tabbar -->
    <view class="tabbar">
      <view class="tab-item" :class="{ active: currentTab === 'home' }" @click="handleTabClick('home')">
        <wd-icon name="home" size="24px" :color="currentTab === 'home' ? '#4A90E2' : '#666'"></wd-icon>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item" @click="handleTabClick('stats')">
        <wd-icon name="chart" size="24px" color="#666"></wd-icon>
        <text class="tab-text">统计</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 'profile' }" @click="handleTabClick('profile')">
        <wd-icon name="user" size="24px" :color="currentTab === 'profile' ? '#4A90E2' : '#666'"></wd-icon>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import HomePage from '@/components/HomePage.vue';
import MyPage from '@/components/MyPage.vue';


const currentTab = ref<'home' | 'stats' | 'profile'>('home');

const handleTabClick = (tab: 'home' | 'stats' | 'profile') => {
  currentTab.value = tab;
  if (tab === 'stats') {
    uni.showToast({
      title: '页面开发中',
      icon: 'none',
      duration: 2000
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(180deg, #e6f2ff 0%, #f0f9ff 100%);
  padding-bottom: calc(80rpx + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
}

.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: calc(env(safe-area-inset-bottom));

  .tab-item {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6rpx;
    position: relative;
    transition: all 0.3s ease;
    padding: 6rpx 0;

    :deep(.wd-icon) {
      font-size: 22px !important;
      color: #999;
    }

    .tab-text {
      font-size: 20rpx;
      color: #999;
      font-weight: 400;
    }

    &.active {
      .tab-text {
        background: linear-gradient(135deg, #4A90E2 0%, #2b7cd9 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 500;
      }

      :deep(.wd-icon) {
        background: linear-gradient(135deg, #4A90E2 0%, #2b7cd9 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent !important;
      }

      &::after {
        display: none;
      }
    }

    &:active {
      transform: scale(0.95);
      opacity: 0.9;
    }
  }
}
</style>
