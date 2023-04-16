import { HTMLAttributes } from 'react';
import { cls } from '@/utils/helper';
import { SkyConType } from '@/types/skycon';

export type IconType = 'baoyu'
  | 'baitianduoyun'
  | 'baoxue'
  | 'daxue'
  | 'dabaoyu'
  | 'baitianzhenxue'
  | 'dayu'
  | 'baitianzhenyu'
  | 'dongyu'
  | 'wu'
  | 'qiangshachenbao'
  | 'leizhenyubanyoubingbao'
  | 'leizhenyu'
  | 'shachenbao'
  | 'tedabaoyu'
  | 'fuchen'
  | 'qing'
  | 'xiaoxue'
  | 'xiaoyu'
  | 'yejianzhenxue'
  | 'yangsha'
  | 'wumai'
  | 'yin'
  | 'zhongyu'
  | 'yujiaxue'
  | 'zhongxue'
  | 'yejianduoyun'
  | 'yejianzhenyu'
  | 'yejianqing'

function skycon2type(skycon: SkyConType): IconType {
  switch (skycon) {
    case 'CLEAR_DAY':
      return 'qing';
    case 'CLEAR_NIGHT':
      return 'yejianqing';
    case 'PARTLY_CLOUDY_DAY':
      return 'baitianduoyun';
    case 'PARTLY_CLOUDY_NIGHT':
      return 'yejianduoyun';
    case 'CLOUDY':
      return 'yin';
    case 'LIGHT_HAZE':
      return 'wumai';
    case 'MODERATE_HAZE':
      return 'wumai';
    case 'HEAVY_HAZE':
      return 'wumai';
    case 'LIGHT_RAIN':
      return 'xiaoyu';
    case 'MODERATE_RAIN':
      return 'zhongyu';
    case 'HEAVY_RAIN':
      return 'dayu';
    case 'STORM_RAIN':
      return 'baoyu';
    case 'FOG':
      return 'wu';
    case 'LIGHT_SNOW':
      return 'xiaoxue';
    case 'MODERATE_SNOW':
      return 'zhongxue';
    case 'HEAVY_SNOW':
      return 'daxue';
    case 'STORM_SNOW':
      return 'baoxue';
    case 'DUST':
      return 'fuchen';
    case 'SAND':
      return 'qiangshachenbao';
    case 'WIND':
      return 'shachenbao';
  }
}

export interface WeatherIconProps extends Omit<IconfontProps, 'icon'> {
  skycon: SkyConType;
}

export default function WeatherIcon({ skycon, ...props }: WeatherIconProps) {
  const iconName = skycon2type(skycon);

  return (
    <Iconfont {...props} icon={`#weather-icon-${iconName}`} />
  );
}

interface IconfontProps extends HTMLAttributes<HTMLOrSVGElement> {
  icon: string;
}

function Iconfont({ icon, className, ...props }: IconfontProps) {
  return (
    <svg className={cls('iconfont', className)} aria-hidden="true" {...props}>
      <use xlinkHref={icon} />
    </svg>
  );
}