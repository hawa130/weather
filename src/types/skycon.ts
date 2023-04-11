export type SkyConType = 'CLEAR_DAY'
  | 'CLEAR_NIGHT'
  | 'PARTLY_CLOUDY_DAY'
  | 'PARTLY_CLOUDY_NIGHT'
  | 'CLOUDY'
  | 'LIGHT_HAZE'
  | 'MODERATE_HAZE'
  | 'HEAVY_HAZE'
  | 'LIGHT_RAIN'
  | 'MODERATE_RAIN'
  | 'HEAVY_RAIN'
  | 'STORM_RAIN'
  | 'FOG'
  | 'LIGHT_SNOW'
  | 'MODERATE_SNOW'
  | 'HEAVY_SNOW'
  | 'STORM_SNOW'
  | 'DUST'
  | 'SAND'
  | 'WIND'

const SkyConMap: Record<SkyConType, string> = {
  'CLEAR_DAY': '晴',
  'CLEAR_NIGHT': '晴',
  'PARTLY_CLOUDY_DAY': '多云',
  'PARTLY_CLOUDY_NIGHT': '多云',
  'CLOUDY': '阴',
  'LIGHT_HAZE': '轻度雾霾',
  'MODERATE_HAZE': '中度雾霾',
  'HEAVY_HAZE': '重度雾霾',
  'LIGHT_RAIN': '小雨',
  'MODERATE_RAIN': '中雨',
  'HEAVY_RAIN': '大雨',
  'STORM_RAIN': '暴雨',
  'FOG': '雾',
  'LIGHT_SNOW': '小雪',
  'MODERATE_SNOW': '中雪',
  'HEAVY_SNOW': '大雪',
  'STORM_SNOW': '暴雪',
  'DUST': '浮尘',
  'SAND': '沙尘',
  'WIND': '大风',
};

export function getSkyConText(weather: SkyConType): string {
  return SkyConMap[weather];
}