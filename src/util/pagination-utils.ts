/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
export const loadMoreDataWhenScrolled = (currentData: any, incomingData: any, links: any): any => {
  if (links.first === links.last || !currentData.length) {
    return incomingData;
  }
  if (currentData.length >= incomingData.length) {
    return [...currentData, ...incomingData];
  }
  return null;
};
