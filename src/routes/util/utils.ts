export const formatArrayForUrl = (queryArray: string[]): string => {
  if (!Array.isArray(queryArray) || queryArray.length === 0) {
    return '';
  }
  console.log(queryArray.join(','));
  return queryArray.join(',');
};
