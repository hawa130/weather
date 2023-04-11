import { RealtimeData } from '@/types/realtime';
import { MinutelyData } from '@/types/minutely';
import { HourlyData } from '@/types/hourly';
import { DailyData } from '@/types/daily';
import { WeatherAlert } from '@/types/alert';
import { LocationType } from '@/types/general';

export interface WeatherData {
  status: string;
  api_version: string;
  api_status: string;
  lang: string;
  unit: string;
  tzshift: number;
  timezone: string;
  server_time: number;
  location: LocationType;
  result: {
    alert?: WeatherAlert;
    realtime?: RealtimeData;
    minutely?: MinutelyData;
    hourly?: HourlyData;
    daily?: DailyData;
    primary: number;
    forecast_keypoint?: string;
  };
}