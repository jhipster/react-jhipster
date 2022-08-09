import { getUrlParameter } from '../../util/url-utils';

export interface IPaginationBaseState {
  itemsPerPage: number;
  activePage: number;
}

export const getPaginationState = (
  location: { search: string },
  itemsPerPage: number
): IPaginationBaseState => {
  const pageParam = getUrlParameter('page', location.search);
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  return { itemsPerPage, activePage };
};

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
