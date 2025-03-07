<template>
  <view class="my-container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="avatar-wrapper">
        <wd-icon name="user" size="48px" color="#4A90E2"></wd-icon>
      </view>
      <view class="user-info">
        <text class="username">未登录用户</text>
        <text class="motto">点击设置个性签名</text>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="feature-grid">
      <view class="feature-item" @click="handleFeatureClick('设置')">
        <view class="feature-icon">
          <wd-icon name="setting" size="28px" color="#4A90E2"></wd-icon>
        </view>
        <text class="feature-title">个人设置</text>
      </view>

      <view class="feature-item" @click="handleFeatureClick('收藏')">
        <view class="feature-icon">
          <wd-icon name="star" size="28px" color="#4A90E2"></wd-icon>
        </view>
        <text class="feature-title">我的收藏</text>
      </view>
    </view>

    <!-- 个性化展示区域 -->
    <view class="personalized-section">
      <view class="section-header">
        <text class="section-title">最近活动</text>
        <wd-icon name="arrow-right" size="20px" color="#999"></wd-icon>
      </view>
      <view class="activity-list">
        <text class="empty-tip">暂无最近活动记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleFeatureClick = (featureName: string) => {
  uni.showToast({
    title: `${featureName}功能开发中`,
    icon: 'none',
    duration: 2000
  });
};
</script>

<style lang="scss" scoped>
.my-container {
  padding: 32rpx;
  min-height: 100vh;
  background: #f5f7fa;
}

.user-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.08);

  .avatar-wrapper {
    width: 96rpx;
    height: 96rpx;
    background: rgba(74, 144, 226, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .username {
      font-size: 32rpx;
      color: #333;
      margin-bottom: 8rpx;
    }

    .motto {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 32rpx;

  .feature-item {
    background: white;
    border-radius: 16rpx;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.08);

    .feature-icon {
      margin-bottom: 16rpx;
    }

    .feature-title {
      font-size: 28rpx;
      color: #333;
    }
  }
}

.personalized-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .section-title {
      font-size: 32rpx;
      color: #333;
    }
  }

  .activity-list {
    min-height: 200rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .empty-tip {
      color: #999;
      font-size: 28rpx;
    }
  }
}
</style>