import { SkyConType } from '@/types/skycon';
import { AQIType, WindType } from '@/types/general';

export interface RealtimeData {
  status: string;
  // 地表 2 米气温
  temperature: number;
  // 地表 2 米湿度相对湿度(%)
  humidity: number;
  // 总云量(0.0-1.0)
  cloudrate: number;
  // 天气现象
  skycon: SkyConType;
  // 地表水平能见度
  visibility: number;
  // 向下短波辐射通量(W/M2)
  dswrf: number;
  // 风
  wind: WindType;
  // 地面气压
  pressure: number;
  // 体感温度
  apparent_temperature: number;
  // 降水
  precipitation: PrecipitationType;
  // 空气质量
  air_quality: AirQualityType;
  // 生活指数
  life_index: LifeIndexType;
}

export type PrecipitationType = {
  local: {
    status: string;
    datasource: string;
    // 本地降水强度
    intensity: number;
  };
  nearest: {
    status: string;
    // 最近降水带与本地的距离
    distance: number;
    // 最近降水处的降水强度
    intensity: number;
  }
}

export type AirQualityType = {
  // PM2.5 浓度(μg/m3)
  pm25: number;
  // PM10 浓度(μg/m3)
  pm10: number;
  // 臭氧浓度(μg/m3)
  o3: number;
  // 二氧化硫浓度(μg/m3)
  so2: number;
  // 二氧化氮浓度(μg/m3)
  no2: number;
  // 一氧化碳浓度(μg/m3)
  co: number;
  // 空气质量指数
  aqi: AQIType;
  // 空气质量描述
  description: {
    chn: string;
    usa: string;
  }
}

export type LifeIndexType = {
  // 紫外线强度
  ultraviolet: {
    // 等级
    index: number;
    // 描述
    desc: string;
  };
  // 舒适度
  comfort: {
    // 等级
    index: number;
    // 描述
    desc: string;
  }
}