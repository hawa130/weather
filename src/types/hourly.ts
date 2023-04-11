import { SkyConType } from '@/types/skycon';

import { AQIType } from '@/types/general';

export interface HourlyData {
  status: string;
  description: string;
  precipitation: HourlyPrecipitationType[];
  temperature: HourlyGeneralType[];
  apparent_temperature: HourlyGeneralType[];
  wind: HourlyWindType[];
  humidity: HourlyGeneralType[];
  cloudrate: HourlyGeneralType[];
  skycon: HourlyGeneralType<SkyConType>[];
  pressure: HourlyGeneralType[];
  visibility: HourlyGeneralType[];
  dswrf: HourlyGeneralType[];
  air_quality: {
    aqi: HourlyGeneralType<AQIType>[];
    pm25: HourlyGeneralType[];
  };
}

export type HourlyGeneralType<T = number> = {
  datetime: string;
  value: T;
}

export type HourlyPrecipitationType = {
  datetime: string;
  value: number;
  probability: number;
}

export type HourlyWindType = {
  datetime: string;
  speed: number;
  direction: number;
}
