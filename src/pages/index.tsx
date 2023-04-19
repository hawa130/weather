import { Inter } from 'next/font/google';
import { ActionIcon, AppShell, Box, Container, Divider, Drawer, Menu, NavLink, SimpleGrid, Text } from '@mantine/core';
import useSWR from 'swr';
import CityOverview from '@/components/CityOverview';
import AirQualityCard from '@/components/AirQualityCard';
import { WeatherData } from '@/types/weather';
import HourlyCard from '@/components/HourlyCard';
import WindCard from '@/components/WindCard';
import SunCard from '@/components/SunCard';
import ExtraCard from '@/components/ExtraCard';
import DailyCard from '@/components/DailyCard';
import { getWeatherBg, getWeatherBgColor } from '@/utils/weather';
import axios from 'axios';
import { fetchWeatherData } from '@/pages/api/weather';
import { useEffect, useMemo, useState } from 'react';
import { getLocation } from '@/utils/location';
import { GeolocationError, ReGeocodeResult } from '@/types/location';
import { notifications, Notifications } from '@mantine/notifications';
import MinutelyCard from '@/components/MinutelyCard';
import AlertCard from '@/components/AlertCard';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { ChevronDown, ChevronUp, CurrentLocation, Dots, Trash } from 'tabler-icons-react';
import GeoMap, { parsePosition } from '@/components/GeoMap';
import { cls, extractArrayOrString } from '@/utils/helper';
import { SimpleBadge } from '@/components/SimpleBadge';

const inter = Inter({ subsets: ['latin'] });

export interface LocationType {
  lnglat: string;
  province: string;
  city: string;
  district: string;
  street: string;
  address: string;
}

export default function Home({ initData, AMapKey }: { initData?: WeatherData, AMapKey: string }) {
  const [coord, setCoord] = useState<string>();
  const [locating, setLocating] = useState<boolean>(false);
  const [isManualLocated, setIsManualLocated] = useState<boolean>(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [myAddress, setMyAddress] = useState<ReGeocodeResult>();

  // 地点列表
  const [locationList, setLocationList] = useLocalStorage<LocationType[]>({ key: 'location', defaultValue: [] });

  const addToLocationList = (location: LocationType) => {
    if (locationList.some((l) => l.lnglat === location.lnglat)) return;
    setLocationList([...locationList, location]);
  };

  const removeFromLocationList = (lnglat: string) => {
    setLocationList(locationList.filter((l) => l.lnglat !== lnglat));
  };

  const moveUpInLocationList = (lnglat: string) => {
    const index = locationList.findIndex((l) => l.lnglat === lnglat);
    if (index === 0) return;
    const newList = [...locationList];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setLocationList(newList);
  };

  const moveDownInLocationList = (lnglat: string) => {
    const index = locationList.findIndex((l) => l.lnglat === lnglat);
    if (index === locationList.length - 1) return;
    const newList = [...locationList];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    setLocationList(newList);
  };

  const { data } = useSWR<WeatherData>(
    coord ? ['/api/weather', coord] : null,
    async ([url, coord]: [string, string | undefined]) => (await axios.get(url, { params: { coord } })).data,
    // To use mock data:
    // async () => await import('../mock/weather.json').then((res) => res.default) as WeatherData,
    { fallbackData: initData, keepPreviousData: true },
  );

  const { data: geoData, isLoading: geoFetching, mutate: mutateGeo } = useSWR<ReGeocodeResult>(
    coord ? ['/api/geocode', coord] : null,
    async ([url, coord]: [string, string | undefined]) => (await axios.get(url, { params: { coord } })).data,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const handleGetLocation = () => {
    setLocating(true);
    return getLocation(AMapKey)
      .then((result) => {
        setCoord(result.position.toString());
        setIsManualLocated(false);
      })
      .catch((err: GeolocationError) => notifications.show({
        radius: 'md',
        color: 'red',
        title: '定位失败',
        message: err.message,
        styles: (theme) => ({
          root: {
            backgroundColor: 'rgba(50, 50, 50, 0.3)',
            borderColor: 'rgba(200, 200, 200, 0.17)',
            backdropFilter: 'blur(8px)',
          },
          description: {
            color: theme.white,
            opacity: 0.8,
          },
        }),
      }))
      .finally(() => setLocating(false));
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (geoData && !isManualLocated) {
      setMyAddress(geoData);
    }
  }, [geoData, isManualLocated]);

  const getCityAndDistrict = (info: ReGeocodeResult) => {
    const province = extractArrayOrString(info.regeocode.addressComponent.province);
    const cityData = info.regeocode.addressComponent.city;
    const city = Array.isArray(cityData) ? province : cityData;
    const districtData = info.regeocode.addressComponent.district;
    const district = extractArrayOrString(districtData);
    return [province, city, district];
  };

  const city = useMemo(() => {
    if (!geoData?.regeocode?.addressComponent) return undefined;
    return getCityAndDistrict(geoData).slice(1, 3);
  }, [geoData]);

  const street = useMemo(() => {
    if (geoData?.regeocode?.addressComponent) {
      return extractArrayOrString(geoData.regeocode.addressComponent.streetNumber.street);
    }
    return undefined;
  }, [geoData]);

  const [sunrise, sunset] = useMemo(() => {
    if (data?.result?.daily?.astro[0]) {
      const dateString = new Date().toISOString().split('T')[0];
      const astro = data.result.daily.astro[0];
      const sunrise = new Date(`${dateString}T${astro.sunrise.time}+08:00`);
      const sunset = new Date(`${dateString}T${astro.sunset.time}+08:00`);
      return [sunrise, sunset];
    }
    return [undefined, undefined];
  }, [data?.result?.daily?.astro[0].sunrise.time, data?.result?.daily?.astro[0].sunset.time]);

  const isNight = useMemo(() => {
    if (!sunrise || !sunset) return false;
    return new Date() > sunset || new Date() < sunrise;
  }, [sunrise, sunset]);

  return (
    <AppShell className={`${inter.className} bg-fixed ${getWeatherBg(data?.result?.realtime?.skycon, isNight)}`}>
      <Container size="lg" p={0}>
        <CityOverview
          city={city?.join('')}
          street={street}
          temperature={data?.result?.realtime?.temperature}
          highTemperature={data?.result?.daily?.temperature[0].max}
          lowTemperature={data?.result?.daily?.temperature[0].min}
          skycon={data?.result?.realtime?.skycon}
          locating={locating}
          geoLoading={geoFetching}
          showLocationIcon={locating || !isManualLocated}
          onGetLocation={openDrawer}
        />
        {data?.result?.alert?.content.length ? (
          <AlertCard mt={16} data={data?.result?.alert?.content} />
        ) : null}
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          spacing="lg"
          mt="lg"
        >
          <SimpleGrid cols={1} spacing="lg">
            <MinutelyCard data={data?.result?.minutely} description={data?.result?.minutely?.description} />
            <AirQualityCard data={data?.result?.realtime?.air_quality} />
          </SimpleGrid>
          <HourlyCard data={data?.result?.hourly} skycon={data?.result?.realtime?.skycon} isNight={isNight} />
          <DailyCard className="col-span-1" data={data?.result?.daily} />
          <SimpleGrid cols={1} spacing="lg">
            <SimpleGrid cols={2} spacing="lg">
              <WindCard data={data?.result?.realtime?.wind} />
              <SunCard data={data?.result?.daily?.astro[0]} />
            </SimpleGrid>
            <ExtraCard
              data={data?.result?.realtime}
              probability={data?.result?.hourly?.precipitation[0].probability}
            />
          </SimpleGrid>
        </SimpleGrid>
        <Text align="center" size="sm" mt="lg">
          <span className="opacity-60">数据来源：</span>
          <a className="opacity-60 hover:opacity-100" href="https://www.caiyunapp.com/" target="_blank">彩云天气</a>
        </Text>
      </Container>

      <Notifications position="top-right" autoClose={3000} />

      <Drawer
        classNames={{
          content: cls(getWeatherBgColor(data?.result?.realtime?.skycon, isNight), 'bg-opacity-40 backdrop-blur'),
          header: 'bg-transparent',
        }}
        keepMounted
        opened={drawerOpened} onClose={closeDrawer}
      >
        <Box mx={-12}>
          <GeoMap
            pb="md" mt={-46}
            AMapKey={AMapKey}
            coordinate={parsePosition(coord)}
            pinList={locationList}
            setPinList={setLocationList}
            onChangeCoord={(c, info) => {
              setIsManualLocated(true);
              const coordString = c.toString();
              setCoord(coordString);
              mutateGeo(info);
              const [province, city, district] = getCityAndDistrict(info);
              const street = extractArrayOrString(info.regeocode.addressComponent.streetNumber.street);
              const address = extractArrayOrString(info.regeocode.formatted_address);
              addToLocationList({
                lnglat: coordString,
                province: province ?? '',
                city: city ?? '',
                district: district ?? '',
                address: address ?? '',
                street: street ?? '',
              });
            }}
          />
          <Divider className="border-semi-transparent-dark" />
          <NavLink
            px="xl"
            label={locating ? '定位中...' : '我的位置'}
            disabled={locating}
            icon={<CurrentLocation size={20} />}
            onClick={() => handleGetLocation().then(() => closeDrawer())}
            description={myAddress?.regeocode?.formatted_address ?? '未知'}
            active={!isManualLocated}
            classNames={{
              root: cls(getWeatherBgColor(data?.result?.realtime?.skycon, isNight, true), '!bg-opacity-0', 'hover:!bg-opacity-100'),
            }}
          />
          <Divider className="border-semi-transparent-dark" />
          {locationList.map((item, index) => (
            <NavLink
              key={item.lnglat} px={20}
              classNames={{
                root: cls(getWeatherBgColor(data?.result?.realtime?.skycon, isNight, true), '!bg-opacity-0', 'hover:!bg-opacity-100'),
              }}
              label={`${item.city}${item.district} ${item.street}`}
              onClick={() => {
                setCoord(item.lnglat);
                setIsManualLocated(true);
                closeDrawer();
              }}
              active={item.lnglat === coord}
              icon={<SimpleBadge className="!px-1 min-w-[1.25rem]">{index + 1}</SimpleBadge>}
              description={item.address}
              rightSection={
                <Menu shadow="md" width={120} radius="md">
                  <Menu.Target>
                    <ActionIcon onClick={(e) => e.stopPropagation()}>
                      <Dots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown
                    className={cls(getWeatherBgColor(data?.result?.realtime?.skycon, isNight), 'border-semi-transparent-dark bg-opacity-90')}
                  >
                    <Menu.Item
                      py={10} icon={<ChevronUp size={16} />} disabled={index === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveUpInLocationList(item.lnglat);
                      }}
                    >上移</Menu.Item>
                    <Menu.Item
                      py={10} icon={<ChevronDown size={16} />} disabled={index === locationList.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveDownInLocationList(item.lnglat);
                      }}
                    >下移</Menu.Item>
                    <Menu.Divider className="border-semi-transparent-dark" />
                    <Menu.Item
                      py={10} color="red" icon={<Trash size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromLocationList(item.lnglat);
                      }}
                    >删除</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              }
            />
          ))}
        </Box>
      </Drawer>
    </AppShell>
  );
}

export async function getServerSideProps() {
  const data = await fetchWeatherData();
  const AMapKey = process.env.AMAP_JS_KEY;
  return {
    props: { initData: data, AMapKey },
  };
}