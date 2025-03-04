<!-- HomePage组件 -->
<template>
  <view class="home-container">
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
    
    <!-- 风景照片轮播图 -->
    <view class="landscape-swiper">
      <swiper class="swiper" 
        :circular="true"
        :autoplay="true"
        :interval="3000"
        :duration="500"
        :indicator-dots="true"
        indicator-color="rgba(255, 255, 255, 0.6)"
        indicator-active-color="#ffffff"
        @change="handleSwiperChange">
        <swiper-item v-for="(item, index) in landscapes" :key="index" class="swiper-item">
          <image :src="item.url" mode="aspectFill" class="swiper-image"/>
        </swiper-item>
      </swiper>
      <view class="swiper-nav prev" @click="prevImage">
        <wd-icon name="arrow-left" size="16px"></wd-icon>
      </view>
      <view class="swiper-nav next" @click="nextImage">
        <wd-icon name="arrow-right" size="16px"></wd-icon>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="feature-grid">
      <view class="feature-left">
        <view class="feature-item" @click="handleFeatureClick('记账')">
          <view class="feature-header">
            <view class="feature-icon">
              <wd-icon name="money" size="28px" color="#4A90E2"></wd-icon>
            </view>
            <text class="feature-title">记账</text>
          </view>
          <view class="feature-chart">
            <text class="placeholder-text">周期数据统计图表</text>
          </view>
        </view>
      </view>
      
      <view class="feature-right">
        <view class="feature-item todo-item" @click="handleFeatureClick('待办')">
          <view class="todo-header">
            <view class="header-left">
              <view class="feature-icon">
                <wd-icon name="task" size="28px" color="#4A90E2"></wd-icon>
              </view>
              <text class="feature-title">待办</text>
            </view>
            <view class="todo-count">
              <text class="count-value">3</text>
              <text class="count-label">项待办</text>
            </view>
          </view>
          <view class="todo-list">
            <view v-for="item in todoList" :key="item.id" class="todo-item-row">
              <text class="todo-content">{{ item.content }}</text>
              <text class="todo-time">{{ item.time }}</text>
            </view>
          </view>
        </view>

        <view class="feature-item vocab-item" @click="handleFeatureClick('记词')">
          <view class="feature-icon">
            <wd-icon name="edit" size="28px" color="#4A90E2"></wd-icon>
          </view>
          <view class="feature-info">
            <text class="feature-title">记词</text>
            <view class="feature-data">
              <text class="data-value">85</text>
              <text class="data-unit">个</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const landscapes = ref([
  {
    url: 'https://picsum.photos/800/400?random=1',
    title: '自然风光'
  },
  {
    url: 'https://picsum.photos/800/400?random=2',
    title: '山水美景'
  },
  {
    url: 'https://picsum.photos/800/400?random=3',
    title: '城市风光'
  }
]);

const currentIndex = ref(0);

interface SwiperChangeEvent {
  detail: {
    current: number;
  };
}

const handleSwiperChange = (e: SwiperChangeEvent) => {
  currentIndex.value = e.detail.current;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + landscapes.value.length) % landscapes.value.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % landscapes.value.length;
};

const handleFeatureClick = (feature: string) => {
  const routes = {
    '记账': '/pages/accounting/index',
    '待办': '/pages/todo/index',
    '记词': '/pages/vocabulary/index'
  };

  const route = routes[feature];
  if (route) {
    uni.navigateTo({
      url: route,
      fail: (err) => {
        uni.showToast({
          title: '页面开发中',
          icon: 'none',
          duration: 2000
        });
        console.error('导航失败：', err);
      }
    });
  }
};

const todoList = ref([
  { id: 1, content: '完成项目文档', time: '14:30' },
  { id: 2, content: '准备周会演示', time: '16:00' },
  { id: 3, content: '复习英语单词', time: '20:00' }
]);
</script>

<style lang="scss" scoped>
.home-container {
  padding: 20rpx;
  background: linear-gradient(180deg, #e6f2ff 0%, #f0f9ff 100%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 20rpx;
}

.weather-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
  border-radius: 24rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 20rpx;
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
}

.landscape-swiper {
  position: relative;
  
  .swiper {
    height: 280rpx;
    border-radius: 24rpx;
    overflow: hidden;
    
    .swiper-item {
      box-sizing: border-box;
    }
    
    .swiper-image {
      width: 100%;
      height: 100%;
      border-radius: 24rpx;
    }
  }

  .swiper-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44rpx;
    height: 44rpx;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    backdrop-filter: blur(4px);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    
    :deep(.wd-icon) {
      color: #666;
    }
    
    &.prev {
      left: 20rpx;
    }
    
    &.next {
      right: 20rpx;
    }
  }
}

.feature-grid {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
  flex: 1;
  min-height: 460rpx;
  overflow: hidden;
  
  .feature-left {
    flex: 3;
    display: flex;
    flex-direction: column;
    
    .feature-item {
      flex: 1;
      background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
      border-radius: 24rpx;
      padding: 36rpx;
      box-shadow: 0 8rpx 24rpx rgba(74, 144, 226, 0.08);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      border: 1rpx solid rgba(74, 144, 226, 0.1);
      
      &:active {
        transform: scale(0.98);
        box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.06);
      }
      
      .feature-header {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;
        
        .feature-icon {
          width: 72rpx;
          height: 72rpx;
          background: linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(74, 144, 226, 0.05) 100%);
          border-radius: 18rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20rpx;
          transition: all 0.3s ease;
          
          &:active {
            transform: scale(0.95);
          }
        }
        
        .feature-title {
          font-size: 36rpx;
          background: linear-gradient(135deg, #333 0%, #666 100%);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
      }
      
      .feature-chart {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .placeholder-text {
          color: #999;
          font-size: 24rpx;
        }
      }
    }
  }
  
  .feature-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    
    .feature-item {
      background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
      border-radius: 24rpx;
      box-shadow: 0 8rpx 24rpx rgba(74, 144, 226, 0.08);
      transition: all 0.3s ease;
      border: 1rpx solid rgba(74, 144, 226, 0.1);
      
      &:active {
        transform: scale(0.98);
        box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.06);
      }
      
      &.todo-item {
        flex: 2;
        padding: 16rpx;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        
        .todo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 8rpx;
          
          .header-left {
            display: flex;
            align-items: center;
            gap: 12rpx;
            
            .feature-icon {
              background: linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(74, 144, 226, 0.05) 100%);
            }
            
            .feature-title {
              background: linear-gradient(135deg, #333 0%, #666 100%);
              -webkit-background-clip: text;
              color: transparent;
            }
          }
          
          .todo-count {
            display: flex;
            align-items: baseline;
            gap: 4rpx;
            
            .count-value {
              background: linear-gradient(135deg, #4A90E2 0%, #2b7cd9 100%);
              -webkit-background-clip: text;
              color: transparent;
            }
            
            .count-label {
              font-size: 22rpx;
              color: #666;
            }
          }
        }
        
        .todo-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6rpx;
          
          .todo-item-row {
            padding: 6rpx 10rpx;
            background: linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(74, 144, 226, 0.03) 100%);
            border-radius: 6rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            
            &:hover {
              background: linear-gradient(135deg, rgba(74, 144, 226, 0.12) 0%, rgba(74, 144, 226, 0.06) 100%);
            }
            
            .todo-content {
              flex: 1;
              color: #333;
              font-size: 22rpx;
              margin-right: 8rpx;
            }
            
            .todo-time {
              color: #666;
              font-size: 20rpx;
            }
          }
        }
      }
      
      &.vocab-item {
        flex: 1;
        padding: 16rpx;
        display: flex;
        align-items: center;
        gap: 12rpx;
        
        .feature-icon {
          background: linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(74, 144, 226, 0.05) 100%);
        }
        
        .feature-info {
          flex: 1;
          
          .feature-title {
            background: linear-gradient(135deg, #333 0%, #666 100%);
            -webkit-background-clip: text;
            color: transparent;
          }
          
          .feature-data {
            display: flex;
            align-items: baseline;
            gap: 4rpx;
            
            .data-value {
              background: linear-gradient(135deg, #4A90E2 0%, #2b7cd9 100%);
              -webkit-background-clip: text;
              color: transparent;
            }
            
            .data-unit {
              font-size: 22rpx;
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style> 