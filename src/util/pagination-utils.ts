import { isEqual } from 'lodash';

/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
 export const loadMoreDataWhenScrolled = (currentData: any, incomingData: any, links: any, itemsPerPage: number): any => {
   let data = null;
   if (links.first === links.last) {
     data = incomingData;
   } else {
     if (incomingData.length === currentData.length) {
       if (links.prev === undefined) {
         data = incomingData;
       } else if (!isEqual(currentData, incomingData)) {
         data = [...currentData, ...incomingData];
       }
     } else {
       if (incomingData.length === itemsPerPage) {
         data = incomingData;
       } else {
         data = [...currentData, ...incomingData];
       }
     }
   }
   return data;
 };
