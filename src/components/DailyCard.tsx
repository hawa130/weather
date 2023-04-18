import { DailyData } from '@/types/daily';
import DataCard, { DataCardProps } from '@/components/DataCard';
import { CalendarEvent } from 'tabler-icons-react';
import { getSkyConText, SkyConType } from '@/types/skycon';
import { useMemo } from 'react';
import { Table } from '@mantine/core';
import WeatherIcon from '@/components/WeatherIcon';
import AQIBadge from '@/components/AQIBadge';
import { useElementSize } from '@mantine/hooks';

export type DailyRowData = {
  date?: string;
  skycon?: SkyConType;
  precipitation?: number;
  precipitationProbability?: number;
  temperature?: number;
  temperatureMax?: number;
  temperatureMin?: number;
  AQI?: number;
};

export interface DailyCardProps extends Omit<DataCardProps, 'icon' | 'title'> {
  data?: DailyData;
}

export default function DailyCard({ data, ...props }: DailyCardProps) {
  const [rows, minT, maxT] = useMemo(() => {
    let minTemperature: number | undefined = Infinity;
    let maxTemperature: number | undefined = -Infinity;
    return [Array.from({ length: data?.temperature.length ?? 10 }, (_, i): DailyRowData => {
      minTemperature = data?.temperature[i].min && minTemperature
        ? Math.min(minTemperature, data.temperature[i].min) : undefined;
      maxTemperature = data?.temperature[i].max && maxTemperature
        ? Math.max(maxTemperature, data.temperature[i].max) : undefined;
      return {
        date: data?.temperature[i].date,
        skycon: data?.skycon[i].value,
        precipitation: data?.precipitation[i].avg,
        precipitationProbability: data?.precipitation[i].probability,
        temperature: data?.temperature[i].avg,
        temperatureMax: data?.temperature[i].max,
        temperatureMin: data?.temperature[i].min,
        AQI: data?.air_quality.aqi[i].avg.chn,
      };
    }), minTemperature, maxTemperature];
  }, [data]);

  const { ref, width } = useElementSize();

  return (
    <DataCard ref={ref} {...props} icon={<CalendarEvent size={14} />} title={`10日预报`}>
      <Table style={{ tableLayout: 'fixed' }}>
        <tbody>
        {rows.map((row, index) => {
          const date = row.date ? new Date(row.date) : new Date(Date.now() + 86400000 * index);
          return (
            <tr key={row.date}>
              <td style={{ border: 'none', width: width > 400 ? 80 : 40 }}>
                {width > 400 ? `${date.getMonth() + 1}/${date.getDate()} ` : null}
                {date.toDateString() === new Date().toDateString() ? '今天' : `周${getDayOfWeek(date)}`}
              </td>
              {width > 320 ? (
                <td style={{ border: 'none', textAlign: 'center', width: 80 }}>
                  <AQIBadge aqi={row.AQI} showVal={row.AQI != undefined} short />
                </td>
              ) : null}
              <td style={{ border: 'none', textAlign: width > 500 ? 'right' : 'center', width: width > 500 ? 64 : 32 }}>
                {row.skycon ? <WeatherIcon className="w-5 h-5 inline-block" skycon={row.skycon} /> : null}
              </td>
              {width > 500 ? (
                <td style={{ border: 'none', textAlign: 'left', opacity: 0.8, width: 64 }}>
                  {row.skycon ? getSkyConText(row.skycon) : '--'}
                </td>
              ) : null}
              <td style={{ border: 'none', textAlign: 'right', opacity: 0.8, width: 40 }}>
                {row.temperatureMin?.toFixed(0) ?? '--'}°
              </td>
              <td style={{ border: 'none', width: width > 450 ? 120 : '100%' }}>
                <TemperatureIndicator min={row.temperatureMin} max={row.temperatureMax} lower={minT} upper={maxT} />
              </td>
              <td style={{ border: 'none', width: 40 }}>
                {row.temperatureMax?.toFixed(0) ?? '--'}°
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </DataCard>
  );
}

interface TemperatureIndicatorProps {
  min?: number;
  max?: number;
  lower?: number;
  upper?: number;
}

function TemperatureIndicator({ min, max, lower, upper }: TemperatureIndicatorProps) {
  const isValid = min != undefined && max != undefined && lower != undefined && upper != undefined;
  const [left, right] = isValid ? calcBoundary(lower, upper) : [0, 1];

  const bgSize = 300 / (right - left);
  const bgPos = (left + 1) / 3 * 100;

  const mLeftPercent = isValid ? (min - lower) / (upper - lower) * 100 : 100;
  const mRightPercent = isValid ? (upper - max) / (upper - lower) * 100 : 0;

  return (
    <div className="relative temperature-indicator h-1 rounded-full overflow-hidden bg-semi-transparent">
      <div
        className="transition-spacing duration-500"
        style={{
          height: '100%',
          marginLeft: `${mLeftPercent}%`,
          marginRight: `${mRightPercent}%`,
          clipPath: 'inset(0 round 4px)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-linear origin-left"
          style={{
            transform: `scaleX(${bgSize}%) translateX(-${bgPos}%)`,
          }}
        />
      </div>
    </div>
  );
}

function getDayOfWeek(date: Date) {
  return ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
}

type CalcBoundaryConfig = {
  coldTemperature: number;
  hotTemperature: number;
  minGap: number;
}

function calcBoundary(lower: number, upper: number, config: CalcBoundaryConfig = {
  coldTemperature: -10,
  hotTemperature: 40,
  minGap: 0.2,
}): [number, number] {
  const { coldTemperature, hotTemperature, minGap } = config;
  let left = (lower - coldTemperature) / (hotTemperature - coldTemperature);
  let right = (upper - coldTemperature) / (hotTemperature - coldTemperature);

  // 调整间隔
  if (right - left < minGap) {
    const middle = (left + right) / 2;
    left = middle - minGap / 2;
    right = middle + minGap / 2;
  }

  left = Math.max(left, -1);
  right = Math.min(right, 2);

  return [left, right];
}