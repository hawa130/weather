import { SkyConType } from '@/types/skycon';
import { AQIType, WindType } from '@/types/general';

export interface DailyData {
  status: string;
  astro: DailyAstroType[];
  precipitation: DailyPrecipitationType[];
  precipitation_08h_20h: DailyPrecipitationType[];
  precipitation_20h_32h: DailyPrecipitationType[];
  temperature: DailyGeneralType[];
  temperature_08h_20h: DailyGeneralType[];
  temperature_20h_32h: DailyGeneralType[];
  wind: DailyGeneralType<WindType>[];
  wind_08h_20h: DailyGeneralType<WindType>[];
  wind_20h_32h: DailyGeneralType<WindType>[];
  humidity: DailyGeneralType[];
  cloudrate: DailyGeneralType[];
  pressure: DailyGeneralType[];
  visibility: DailyGeneralType[];
  dswrf: DailyGeneralType[];
  // 空气质量
  air_quality: {
    aqi: DailyGeneralType<AQIType>[];
    pm25: DailyGeneralType[];
  };
  // 全天主要天气现象
  skycon: DailySkyConType[];
  // 白天主要天气现象
  skycon_08h_20h: DailySkyConType[];
  // 夜间主要天气现象
  skycon_20h_32h: DailySkyConType[];
  // 生活指数
  life_index: DailyLifeIndexType;
}

export type DailyGeneralType<T = number> = {
  date: string;
  max: T;
  min: T;
  avg: T;
}

export type DailyAstroType = {
  date: string;
  sunrise: { time: string };
  sunset: { time: string };
}

export type DailyPrecipitationType = {
  date: string;
  max: number;
  min: number;
  avg: number;
  probability: number;
}

export type DailySkyConType = {
  data: string;
  value: SkyConType;
}

export type DailyLifeIndexType = {
  ultraviolet: DailyGeneralLifeIndexType[];
  carWashing: DailyGeneralLifeIndexType[];
  dressing: DailyGeneralLifeIndexType[];
  comfort: DailyGeneralLifeIndexType[];
  coldRisk: DailyGeneralLifeIndexType[];
}

export type DailyGeneralLifeIndexType = {
  date: string;
  index: string;
  desc: string;
}