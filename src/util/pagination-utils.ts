import { isEqual } from 'lodash';

/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
export const loadMoreDataWhenScrolled = (currentData: any, incomingData: any, links: any): any => {
  let data = null;
  if (links.first === links.last && incomingData.length) {
    data = incomingData;
  } else {
    if (currentData.length === incomingData.length) {
      if (links.prev === undefined) {
        data = incomingData;
      } else if (!isEqual(currentData, incomingData)) {
        data = [...currentData, ...incomingData];
      }
    } else {
      data = [...currentData, ...incomingData];
    }
  }
  return data;
};
