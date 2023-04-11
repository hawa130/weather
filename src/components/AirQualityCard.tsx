import DataCard from '@/components/DataCard';
import { Activity } from 'tabler-icons-react';

export default function AirQualityCard() {
  return (
    <DataCard icon={<Activity size={14} />} title="AQI">
      <div className="text-[28px] leading-none">500</div>
      <div>严重污染</div>
    </DataCard>
  );
}