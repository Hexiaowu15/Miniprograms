<template>
  <view class="weather-container">
    <view class="weather-card">
      <view class="location-date">
        <view class="location-wrapper">
          <text class="location">北京</text>
          <text class="date">2024年5月16日</text>
        </view>
      </view>
      
      <view class="current-weather">
        <view class="temp-container">
          <view class="temp-row">
            <view class="weather-icon">☀️</view>
            <text class="temperature">25°C</text>
          </view>
          <view class="weather-info">
            <text class="weather-desc">晴</text>
            <text class="detail-item">东南风</text>
            <text class="detail-item">3级</text>
          </view>
        </view>
      </view>

      <view class="forecast-container">
        <view class="forecast-item">
          <text class="day">周五</text>
          <view class="weather-icon">🌥️</view>
          <text class="forecast-temp">23°C</text>
          <view class="forecast-info">
            <text class="forecast-desc">多云</text>
            <text class="forecast-wind">东风3级</text>
          </view>
        </view>
        <view class="forecast-item">
          <text class="day">周六</text>
          <view class="weather-icon">🌧️</view>
          <text class="forecast-temp">20°C</text>
          <view class="forecast-info">
            <text class="forecast-desc">小雨</text>
            <text class="forecast-wind">东北风3级</text>
          </view>
        </view>
        <view class="forecast-item">
          <text class="day">周日</text>
          <view class="weather-icon">☀️</view>
          <text class="forecast-temp">26°C</text>
          <view class="forecast-info">
            <text class="forecast-desc">晴</text>
            <text class="forecast-wind">南风2级</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HomePage'
});
// import { ref } from 'vue'
// const title = ref('你家在那里')

</script>

<style lang="scss" scoped>
.weather-container {
  padding: 10rpx 30rpx;
  background: linear-gradient(180deg, #e6f2ff 0%, #f0f9ff 100%);
  min-height: 100vh;
}

.weather-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
  border-radius: 24rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.location-date {
  padding: 0 10rpx;
  padding-bottom: 0;
  
  .location-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .location {
      font-size: 36rpx;
      font-weight: bold;
    }
    
    .date {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.current-weather {
  padding: 10rpx 10rpx;
  
  .temp-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    .temp-row {
      display: flex;
      align-items: center;
      margin-bottom: 6rpx;
      
      .weather-icon {
        font-size: 48rpx;
        margin-right: 12rpx;
        display: inline-block;
      }
      
      .temperature {
        font-size: 42rpx;
        font-weight: bold;
        background: linear-gradient(135deg, #2b7cd9 0%, #4a90e2 100%);
        -webkit-background-clip: text;
        color: transparent;
        display: inline-block;
      }
    }
    
    .weather-info {
      display: flex;
      align-items: center;
      gap: 8rpx;
      margin-top: 6rpx;
      
      .weather-desc {
        font-size: 24rpx;
        color: #5c7299;
      }

      .detail-item {
        font-size: 22rpx;
        color: #5c7299;
        background-color: rgba(92, 114, 153, 0.1);
        padding: 4rpx 12rpx;
        border-radius: 12rpx;
      }
    }
  }
}

.forecast-container {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
  padding: 0 10rpx;
  margin-top: 16rpx;
  
  .forecast-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx 0;
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
    border-radius: 16rpx;
    box-shadow: 0 2rpx 12rpx rgba(74, 144, 226, 0.08);
    border: 1rpx solid rgba(74, 144, 226, 0.1);
    
    .day {
      font-size: 24rpx;
      color: #5c7299;
      margin-bottom: 12rpx;
    }
    
    .weather-icon {
      font-size: 36rpx;
      margin-bottom: 12rpx;
    }
    
    .forecast-temp {
      font-size: 28rpx;
      font-weight: bold;
      color: #2b7cd9;
    }
    
    .forecast-info {
      display: flex;
      align-items: center;
      gap: 8rpx;
      margin-top: 6rpx;
      
      .forecast-desc {
        font-size: 22rpx;
        color: #5c7299;
        margin-bottom: 0;
      }
      
      .forecast-wind {
        font-size: 20rpx;
        color: #5c7299;
        background-color: rgba(92, 114, 153, 0.1);
        padding: 2rpx 8rpx;
        border-radius: 12rpx;
      }
    }
  }
  
  .divider {
    display: none;
  }
}
</style>
