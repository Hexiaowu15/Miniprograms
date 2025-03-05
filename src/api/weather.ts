import { request } from "@/utils/request";
import { WeatherIcon } from "@/enums";
import { GaudKey } from "@/constants";
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
  weather: string;
  weatherIcon: WeatherIcon;
  windDirection: string;
  windLevel: string;
  date: string;
}

// 获取城市编码返回数据类型
export interface CityCodeResponse {
  status: string;
  info: string;
  regeocode: {
    addressComponent: {
      country: string; // 坐标点所在国家名称
      province: string; // 坐标点所在省名称
      city: string; // 坐标点所在城市名称
      citycode: string; //城市编码
      district: string; // 坐标点所在区
      adcode: string; //行政区编码
    };
  };
}
export interface ForecastData {
  date: string;
  dayOfWeek: string;
  temperature: string;
  weather: string;
  weatherIcon: WeatherIcon
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
const weatherIconMap: Record<string, WeatherIcon> = {
  晴: WeatherIcon.Sunny,
  多云: WeatherIcon.PartlyCloudy,
  阴: WeatherIcon.Cloudy,
  小雨: WeatherIcon.Rainy,
  中雨: WeatherIcon.Rainy,
  大雨: WeatherIcon.Rainy,
  暴雨: WeatherIcon.Stormy,
  雪: WeatherIcon.Snowy,
  雾: WeatherIcon.Foggy,
  // ... 可以根据需要添加更多映射
};

export const weatherApi = {
  // 获取城市编码
  /**
   * 根据地理位置获取城市编码
   * @param {string} location - 地理位置信息
   * @returns {Promise<CityCodeResponse['regeocode']>} - 返回包含城市编码的对象
   * @throws {Error} - 如果获取城市编码失败，抛出错误
   */
  async getCityCode(location: string): Promise<CityCodeResponse['regeocode']> {
    // 定义请求参数
    const params = {
      key: GaudKey,
      location,
      extensions: "base",
    };
    // 发送请求获取城市编码
    const response = await request.weather.get<CityCodeResponse>(
      "v3/geocode/regeo",
      params
    );
    // 检查响应状态和是否存在 regeocode 数据
    if (response.info=="OK") {
      // 提取城市编码
      const cityCode = response.regeocode;
      return cityCode;
    }
    // 如果获取失败，抛出错误
    throw new Error("获取城市编码失败");
  },
  // 获取实时天气
  async getCurrentWeather(cityCode: string) {
    const params = {
      key: GaudKey,
      city: cityCode,
      extensions: "base",
    };

    const response = await request.weather.get<LiveWeatherResponse>(
      "/v3/weather/weatherInfo",
      params
    );

    if (response.status == "1" && response.lives.length > 0) {
      const live = response.lives[0];

      const currentWeather: WeatherData = {
        city: live.city,
        temperature: live.temperature,
        weather: live.weather,
        weatherIcon: weatherIconMap[live.weather] || "sunny",
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
      key: GaudKey, // 你的高德API key
      city: cityCode,
      extensions: "all",
    };

    const response = await request.weather.get<WeatherResponse>(
      "/v3/weather/weatherInfo",
      params
    );

    if (response.status == "1" && response.forecasts.length > 0) {
      const forecast = response.forecasts[0];
      const today = forecast.casts[0];

      // 处理当天天气
      const currentWeather: WeatherData = {
        city: forecast.city,
        temperature: today.daytemp,
        weatherIcon: weatherIconMap[today.dayweather] || WeatherIcon.Sunny,
        weather: today.dayweather,
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
          weatherIcon: weatherIconMap[cast.dayweather] || WeatherIcon.Sunny,
          weather: cast.dayweather,
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
