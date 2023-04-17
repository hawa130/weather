export interface GeolocationResult {
  position: LngLat;
  accuracy: number;
  location_type: 'html5' | 'ip' | 'sdk';
  message: string;
  isConverted: boolean;
  info: string;
}

export interface LngLat {
  offset: (w: number, s: number) => LngLat;
  distance: (lnglat: LngLat | LngLat[]) => number;
  getLng: () => number;
  getLat: () => number;
  equals: (lnglat: LngLat) => boolean;
  toString: () => string;
}

export interface ReGeocodeResult {
  status: number,
  info: string,
  regeocode: {
    addressComponent: AddressComponent;
    roads: Road[];
    roadinters: Cross[];
    pois: POI[];
    aois: AOI[];
  }
}

export interface AddressComponent {
  province: string;
  city: string | [];
  citycode: string;
  district: string;
  adcode: string;
  township: string;
  towncode: string;
  neighborhood: { name: string, type: string };
  building: { name: string, type: string };
  streetNumber: {
    street: string;
    number: string;
    location: string;
    direction: string;
    distance: string;
  };
  seaArea: string;
  businessAreas: {
    id: string;
    name: string;
    location: string;
    businessArea: string;
  }[];
}

export interface Road {
  id: string,
  name: string,
  distance: string,
  direction: string,
  location: string,
}

export interface Cross {
  distance: string,
  direction: string,
  location: string,
  first_id: string,
  first_name: string,
  second_id: string,
  second_name: string,
}

export interface POI {
  id: string,
  name: string,
  type: string,
  tel: string,
  distance: string,
  direction: string,
  address: string,
  location: string,
  businessArea: string,
}

export interface AOI {
  id: string;
  name: string;
  adcode: string;
  location: string;
  area: string;
  distance: string;
  type: string;
}

export interface GeolocationError {
  info: string;
  message: string;
}