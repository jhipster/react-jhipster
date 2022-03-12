import { getUrlParameter } from '../../util/url-utils';

export interface IPaginationBaseState {
  itemsPerPage: number;
  sort: string;
  order: string;
  activePage: number;
}

export const getSortState = (
  location: { search: string },
  itemsPerPage: number,
  sortField = 'id',
  sortOrder = 'asc'
): IPaginationBaseState => {
  const pageParam = getUrlParameter('page', location.search);
  const sortParam = getUrlParameter('sort', location.search);
  let sort = sortField;
  let order = sortOrder;
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  if (sortParam !== '') {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { itemsPerPage, sort, order, activePage };
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
