import { getAQIText } from '@/components/AirQualityCard';
import { cls } from '@/utils/helper';

export interface AQIBadgeProps {
  aqi: number;
  showVal?: boolean;
  short?: boolean;
  className?: string;
}

export default function AQIBadge({ aqi, showVal, short, className }: AQIBadgeProps) {
  const text = short ? getAQIText(aqi).slice(0, 2) : getAQIText(aqi);
  return (
    <span
      className={cls(className, 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-semi-transparent whitespace-nowrap')}
    >{showVal ? aqi : null} {text}</span>
  );
}