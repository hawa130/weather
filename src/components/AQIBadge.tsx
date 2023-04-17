import { getAQIColor, getAQIText } from '@/components/AirQualityCard';

export interface AQIBadgeProps {
  aqi: number;
  showVal?: boolean;
  short?: boolean;
}

export default function AQIBadge({ aqi, showVal, short }: AQIBadgeProps) {
  const color = getAQIColor(aqi);
  const text = short ? getAQIText(aqi).slice(0, 2) : getAQIText(aqi);
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-semi-transparent whitespace-nowrap"
    >{showVal ? aqi : null} {text}</span>
  );
}