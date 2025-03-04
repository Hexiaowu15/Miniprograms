import { request } from "@/utils/request";
import { Weather } from "@/enums/weather";

// 实时天气返回数据类型
export interface LiveWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: Array<{
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
    temperature_float: string;
    humidity_float: string;
  }>;
}

// 天气预报返回数据类型
export interface WeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  forecasts: Array<{
    city: string;
    adcode: string;
    province: string;
    reporttime: string;
    casts: Array<{
      date: string;
      week: string;
      dayweather: string;
      nightweather: string;
      daytemp: string;
      nighttemp: string;
      daywind: string;
      nightwind: string;
      daypower: string;
      nightpower: string;
      daytemp_float: string;
      nighttemp_float: string;
    }>;
  }>;
}

// 处理后的天气数据类型
export interface WeatherData {
  city: string;
  temperature: string;
  weather: Weather;
  windDirection: string;
  windLevel: string;
  date: string;
}

export interface ForecastData {
  date: string;
  dayOfWeek: string;
  temperature: string;
  weather: Weather;
  windDirection: string;
  windLevel: string;
}

// 转换星期数字为中文
const weekMap: Record<string, string> = {
  "1": "周一",
  "2": "周二",
  "3": "周三",
  "4": "周四",
  "5": "周五",
  "6": "周六",
  "7": "周日",
};

// 天气文字到图标的映射
const weatherIconMap: Record<string, Weather> = {
  晴: Weather.Sunny,
  多云: Weather.PartlyCloudy,
  阴: Weather.Cloudy,
  小雨: Weather.Rainy,
  中雨: Weather.Rainy,
  大雨: Weather.Rainy,
  暴雨: Weather.Stormy,
  雪: Weather.Snowy,
  雾: Weather.Foggy,
  // ... 可以根据需要添加更多映射
};

export const weatherApi = {
  // 获取实时天气
  async getCurrentWeather(cityCode: string) {
    const params = {
      key: "your-amap-key",
      city: cityCode,
      extensions: "base",
    };

    const response = await request.weather.get<LiveWeatherResponse>(
      "/v3/weather/weatherInfo",
      params
    );

    if (response.status === "1" && response.lives.length > 0) {
      const live = response.lives[0];

      const currentWeather: WeatherData = {
        city: live.city,
        temperature: live.temperature,
        weather: weatherIconMap[live.weather] || "sunny",
        windDirection: live.winddirection,
        windLevel: live.windpower,
        date: live.reporttime.split(" ")[0], // 只取日期部分
      };

      return currentWeather;
    }

    throw new Error("获取实时天气失败");
  },

  // 获取天气预报
  async getForecast(cityCode: string) {
    const params = {
      key: "your-amap-key", // 你的高德API key
      city: cityCode,
      extensions: "all",
    };

    const response = await request.weather.get<WeatherResponse>(
      "/v3/weather/weatherInfo",
      params
    );

    if (response.status === "1" && response.forecasts.length > 0) {
      const forecast = response.forecasts[0];
      const today = forecast.casts[0];

      // 处理当天天气
      const currentWeather: WeatherData = {
        city: forecast.city,
        temperature: today.daytemp,
        weather: weatherIconMap[today.dayweather] || Weather.Sunny,
        windDirection: today.daywind,
        windLevel: today.daypower,
        date: today.date,
      };

      // 处理未来天气预报
      const forecastList: ForecastData[] = forecast.casts
        .slice(1, 4)
        .map((cast) => ({
          date: cast.date,
          dayOfWeek: weekMap[cast.week] || "未知",
          temperature: cast.daytemp,
          weather: weatherIconMap[cast.dayweather] || Weather.Sunny,
          windDirection: cast.daywind,
          windLevel: cast.daypower,
        }));

      return {
        current: currentWeather,
        forecast: forecastList,
      };
    }

    throw new Error("获取天气数据失败");
  },
};
