import { LngLatLocationType } from '@/types/general';

export interface WeatherAlert {
  status: string;
  content: WeatherAlertContent[];
  // 行政区划层级信息
  adcodes: ADCodeType[];
}

export type WeatherAlertContent = {
  // 省，如"福建省"
  province: string;
  // 预警信息的状态，如"预警中"
  status: string;
  // 预警代码，如"0902"（预警类型编码＋预警级别编码）
  code: string;
  // 描述
  description: string;
  regionId: string;
  // 县，如"无"
  county: string;
  // 发布时间，单位是 Unix 时间戳，如 1587443583
  pubtimestamp: number;
  latlon: LngLatLocationType;
  // 市，如"三明市"
  city: string;
  // 预警 ID，如 "35040041600001_20200421123203"
  alertId: string;
  // 标题，如"三明市气象台发布雷电黄色预警[Ⅲ 级/较重]"
  title: string;
  // 区域代码，如 "350400"
  adcode: string;
  // 发布单位，如"国家预警信息发布中心"
  source: string;
  // 位置，如"福建省三明市"
  location: string;
  request_status: string;
}

export type ADCodeType = {
  adcode: number;
  name: string;
}