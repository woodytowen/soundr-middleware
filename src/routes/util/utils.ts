export const formatArrayForUrl = (queryArray: string[]): string => {
  return !Array.isArray(queryArray) || queryArray.length === 0 ? '' : queryArray.join(',');
};
