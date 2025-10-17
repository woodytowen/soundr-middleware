import geoHash from 'ngeohash';

export const formatArrayForUrl = (queryArray: string[]): string => {
  return !Array.isArray(queryArray) || queryArray.length === 0 ? '' : queryArray.join(',');
};

export const convertLatLongToGeoHash = (lat: number, long: number, precision: number = 9) =>
  geoHash.encode(lat, long, precision);
