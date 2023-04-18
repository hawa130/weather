import { getAQIText } from '@/components/AirQualityCard';
import { SimpleBadge, SimpleBadgeProps } from '@/components/SimpleBadge';

export interface AQIBadgeProps extends SimpleBadgeProps {
  aqi?: number;
  showVal?: boolean;
  short?: boolean;
}

export default function AQIBadge({ aqi, showVal, short, ...props }: AQIBadgeProps) {
  const text = short ? getAQIText(aqi).slice(0, 2) : getAQIText(aqi);
  return (
    <SimpleBadge {...props}>{showVal ? aqi : null} {text}</SimpleBadge>
  );
}