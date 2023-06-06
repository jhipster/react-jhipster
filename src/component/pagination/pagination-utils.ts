import { getUrlParameter } from '../../util/url-utils';

export interface ISortBaseState {
  sort: string;
  order: string;
}

export interface IPaginationBaseState extends ISortBaseState {
  itemsPerPage: number;
  activePage: number;
}

export const getSortState = (location: { search: string }, sortField = 'id', sortOrder = 'asc'): ISortBaseState => {
  const sortParam = getUrlParameter('sort', location.search);
  let sort = sortField;
  let order = sortOrder;
  if (sortParam !== '') {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { sort, order };
};

export const getPaginationState = (
  location: { search: string },
  itemsPerPage: number,
  sortField = 'id',
  sortOrder = 'asc'
): IPaginationBaseState => {
  const pageParam = getUrlParameter('page', location.search);
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  const { sort, order } = getSortState(location, sortField, sortOrder);
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
