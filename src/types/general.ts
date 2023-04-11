export type WindType = {
  // 地表 10 米风速
  speed: number;
  // 地表 10 米风向
  direction: number;
}

export type AQIType = {
  // 国标 AQI
  chn: number;
  // 美标 AQI
  usa: number;
}

export type LocationType = [
  // 纬度
  number,
  // 经度
  number,
]