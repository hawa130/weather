export interface MinutelyData {
  status: string;
  datasource: string;
  // 未来 2 小时每一分钟的雷达降水强度
  precipitation_2h: number[];
  // 未来 1 小时每一分钟的雷达降水强度
  precipitation: number[];
  // 未来两小时每半小时的降水概率
  probability: number[];
  description: string;
}