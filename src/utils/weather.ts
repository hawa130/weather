import { SkyConType } from '@/types/skycon';

export function getWeatherBg(skycon?: SkyConType, isNight?: boolean) {
  if (isNight == undefined) {
    const sunrise = new Date().setHours(6, 0, 0, 0);
    const sunset = new Date().setHours(18, 0, 0, 0);
    const now = new Date().getTime();
    isNight = now < sunrise || now > sunset;
  }
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

export function getWeatherBgColor(skycon?: SkyConType, isNight?: boolean, force?: boolean) {
  if (isNight == undefined) {
    const sunrise = new Date().setHours(6, 0, 0, 0);
    const sunset = new Date().setHours(18, 0, 0, 0);
    const now = new Date().getTime();
    isNight = now < sunrise || now > sunset;
  }
  switch (skycon) {
    case 'CLEAR_DAY':
      return force ? '!bg-clear-day' : 'bg-clear-day';
    case 'CLEAR_NIGHT':
      return force ? '!bg-clear-night' : 'bg-clear-night';
    case 'PARTLY_CLOUDY_DAY':
      return force ? '!bg-partly-cloudy-day' : 'bg-partly-cloudy-day';
    case 'PARTLY_CLOUDY_NIGHT':
      return force ? '!bg-partly-cloudy-night' : 'bg-partly-cloudy-night';
    case 'CLOUDY':
      return isNight
        ? force ? '!bg-cloudy-night' : 'bg-cloudy-night'
        : force ? '!bg-cloudy-day' : 'bg-cloudy-day';
    case 'LIGHT_HAZE':
    case 'MODERATE_HAZE':
    case 'HEAVY_HAZE':
      return isNight
        ? force ? '!bg-haze-night' : 'bg-haze-night'
        : force ? '!bg-haze-day' : 'bg-haze-day';
    case 'LIGHT_RAIN':
    case 'MODERATE_RAIN':
    case 'HEAVY_RAIN':
    case 'STORM_RAIN':
      return isNight
        ? force ? '!bg-cloudy-night' : 'bg-cloudy-night'
        : force ? '!bg-cloudy-day' : 'bg-cloudy-day';
    case 'FOG':
      return isNight
        ? force ? '!bg-fog-night' : 'bg-fog-night'
        : force ? '!bg-fog-day' : 'bg-fog-day';
    case 'LIGHT_SNOW':
    case 'MODERATE_SNOW':
    case 'HEAVY_SNOW':
    case 'STORM_SNOW':
      return isNight
        ? force ? '!bg-snow-night' : 'bg-snow-night'
        : force ? '!bg-snow-day' : 'bg-snow-day';
    case 'DUST':
      return isNight
        ? force ? '!bg-dust-night' : 'bg-dust-night'
        : force ? '!bg-dust-day' : 'bg-dust-day';
    case 'SAND':
      return isNight
        ? force ? '!bg-sand-night' : 'bg-sand-night'
        : force ? '!bg-sand-day' : 'bg-sand-day';
    case 'WIND':
      return isNight
        ? force ? '!bg-cloudy-night' : 'bg-cloudy-night'
        : force ? '!bg-cloudy-day' : 'bg-cloudy-day';
    default:
      return isNight ?
        force ? '!bg-partly-cloudy-night' : 'bg-partly-cloudy-night'
        : force ? '!bg-partly-cloudy-day' : 'bg-partly-cloudy-day';
  }
}
