import { Box, BoxProps, Button, Group, Text } from '@mantine/core';
import { getMapObject } from '@/utils/location';
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { ReGeocodeResult } from '@/types/location';
import { Plus } from 'tabler-icons-react';
import useSWR from 'swr';
import axios from 'axios';
import { LocationType } from '@/pages';

export interface GeoMapProps extends BoxProps, HTMLAttributes<HTMLDivElement> {
  AMapKey: string;
  coordinate?: [number, number];
  onChangeCoord?: (coord: AMap.LngLat, info: ReGeocodeResult) => void;
  pinList?: LocationType[];
  setPinList?: (val: (LocationType[] | ((prevState: LocationType[]) => LocationType[]))) => void;
}

export function parsePosition(position?: string): [number, number] | undefined {
  if (!position) return undefined;
  return position.split(',').map(l => Number(l)) as [number, number];
}

export default function GeoMap({ AMapKey, coordinate, onChangeCoord, pinList, setPinList, ...props }: GeoMapProps) {
  const map = useRef<AMap.Map>();
  const marker = useRef<AMap.Marker>();
  const AMap = useRef<any>();

  const [lnglat, setLnglat] = useState<AMap.LngLat>();

  const { data: info, isLoading } = useSWR<ReGeocodeResult>(
    lnglat ? ['/api/geocode', lnglat.toString()] : null,
    async ([url, coord]: [string, string | undefined]) => (await axios.get(url, { params: { coord } })).data,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const handleClick = useCallback((e: any) => {
    setLnglat(e.lnglat);
  }, []);

  const initMap = async () => {
    AMap.current = await getMapObject(AMapKey, ['AMap.Geocoder']);
    map.current = new AMap.current.Map('map-container', {
      mapStyle: 'amap://styles/grey',
      touchZoomCenter: 0,
      zoom: 12,
    });
    map.current?.on('click', handleClick);
  };

  const addOrUpdateMarker = async (lnglat: AMap.LngLat | [number, number]) => {
    if (!map.current) return;
    if (marker.current) {
      map.current?.clearMap();
      marker.current = undefined;
    }
    if (!AMap.current) return;
    marker.current = new AMap.current.Marker({
      position: lnglat,
    });
    map.current?.add(marker.current as AMap.Overlay);
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (coordinate && map.current && AMap.current) {
      map.current?.setCenter(coordinate);
      setLnglat(new AMap.current.LngLat(coordinate[0], coordinate[1]));
    }
  }, [coordinate]);

  useEffect(() => {
    if (lnglat) {
      addOrUpdateMarker(lnglat);
    }
  }, [lnglat]);

  return (
    <Box {...props}>
      <Box id="map-container" h={400} />
      <Text size="sm" px="md" pt="md" pb="sm">
        {isLoading ? '地址加载中...' : info?.regeocode?.formatted_address}
      </Text>
      <Group px="md" position="apart">
        <Group>
          <Text size="sm">经度：{lnglat?.getLng().toFixed(5) ?? '未知'}</Text>
          <Text size="sm">纬度：{lnglat?.getLat().toFixed(5) ?? '未知'}</Text>
        </Group>
        {onChangeCoord ? (
          <Button
            disabled={!lnglat
              || !info
              || isLoading
              || pinList?.some(pin => {
                const [lng, lat] = parsePosition(pin.lnglat) as [number, number];
                return lng === lnglat.getLng() && lat === lnglat.getLat();
              })
            }
            onClick={lnglat && info ? () => onChangeCoord(lnglat, info) : undefined}
            variant="outline" color="white"
            leftIcon={<Plus size={16} />}
            radius="md"
          >添加</Button>
        ) : null}
      </Group>
    </Box>
  );
}