import { GeolocationResult } from '@/types/location';

async function importAMapLoader() {
  const mod = await import('@amap/amap-jsapi-loader');
  return mod.default;
}

export function getLocation(key: string) {
  return new Promise<GeolocationResult>(async (resolve, reject) => {
    const AMapLoader = await importAMapLoader();
    const AMap = await AMapLoader.load({ key, version: '2.0', plugins: ['AMap.Geolocation'] });
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认：true
      timeout: 10000, // 设置定位超时时间，默认：无穷大
      offset: [10, 20],  // 定位按钮的停靠位置的偏移量
      zoomToAccuracy: true,  // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      position: 'RB', //  定位按钮的排放位置,  RB表示右下
    });
    geolocation.getCurrentPosition((status: string, result: any) => {
      if (status === 'complete') {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
}

export async function getMapObject(key: string, plugins: string[] = []) {
  const AMapLoader = await importAMapLoader();
  return await AMapLoader.load({ key, version: '2.0', plugins });
}