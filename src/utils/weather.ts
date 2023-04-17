import { SkyConType } from '@/types/skycon';

export function getWeatherBg(skycon?: SkyConType, isNight?: boolean) {
  switch (skycon) {
    case 'CLEAR_DAY':
      return 'bg-gradient-clear-day';
    case 'CLEAR_NIGHT':
      return 'bg-gradient-clear-night';
    case 'PARTLY_CLOUDY_DAY':
      return 'bg-gradient-partly-cloudy-day';
    case 'PARTLY_CLOUDY_NIGHT':
      return 'bg-gradient-partly-cloudy-night';
    case 'CLOUDY':
      return isNight ? 'bg-gradient-cloudy-night' : 'bg-gradient-cloudy-day';
    case 'LIGHT_HAZE':
    case 'MODERATE_HAZE':
    case 'HEAVY_HAZE':
      return isNight ? 'bg-gradient-haze-night' : 'bg-gradient-haze-day';
    case 'LIGHT_RAIN':
    case 'MODERATE_RAIN':
    case 'HEAVY_RAIN':
    case 'STORM_RAIN':
      return isNight ? 'bg-gradient-cloudy-night' : 'bg-gradient-cloudy-day';
    case 'FOG':
      return isNight ? 'bg-gradient-fog-night' : 'bg-gradient-fog-day';
    case 'LIGHT_SNOW':
    case 'MODERATE_SNOW':
    case 'HEAVY_SNOW':
    case 'STORM_SNOW':
      return isNight ? 'bg-gradient-snow-night' : 'bg-gradient-snow-day';
    case 'DUST':
      return isNight ? 'bg-gradient-dust-night' : 'bg-gradient-dust-day';
    case 'SAND':
      return isNight ? 'bg-gradient-sand-night' : 'bg-gradient-sand-day';
    case 'WIND':
      return isNight ? 'bg-gradient-cloudy-night' : 'bg-gradient-cloudy-day';
    default:
      return isNight ? 'bg-gradient-partly-cloudy-night' : 'bg-gradient-partly-cloudy-day';
  }
}