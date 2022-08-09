import { getPaginationState, loadMoreDataWhenScrolled } from './pagination-utils';
import { getSortState } from './sort-utils';

describe('loadMoreDataWhenScrolled', () => {
  const setLinks = (first, last, prev) => ({ first, last, prev });
  const state = { entities: [{ 1: 'fake1' }, { 2: 'fake2' }, { 3: 'fake3' }] };
  const payload = { data: [{ 1: 'fake4' }, { 2: 'fake2' }, { 3: 'fake3' }] };

  describe('When sorting/deleting/editing or if there is only one page', () => {
    it('should replace current data with incoming data', () => {
      expect(loadMoreDataWhenScrolled(state.entities, payload.data, setLinks(0, 0, 0))).toEqual(payload.data);
    });
  });

  describe('When current data length is greater or equal than incoming data length', () => {
    it('should extend current data with incoming data', () => {
      expect(loadMoreDataWhenScrolled(state.entities, payload.data, setLinks(0, 3, 1))).toEqual([...state.entities, ...payload.data]);
    });
  });
});

describe('getPaginationState', () => {
  const NUMBER_OF_ITEMS = 25;

  describe('when retrieving sort state', () => {
    it('should return page number 1 by default', () => {
      expect(getPaginationState({ search: '' }, NUMBER_OF_ITEMS)).toEqual({
        activePage: 1,
        itemsPerPage: NUMBER_OF_ITEMS,
      });
    });

    it('should fall back to 1 for page number if somehing different than a number is given', () => {
      expect(getPaginationState({ search: '?page=invalid' }, NUMBER_OF_ITEMS)).toEqual({
        activePage: 1,
        itemsPerPage: NUMBER_OF_ITEMS,
      });
    });
  });
});

describe('getSortState', () => {

  describe('when retrieving sort state', () => {
    it('should return given sort field and order from search', () => {
      const sortField = 'customField';
      const sortDirection = 'desc';
      expect(getSortState({ search: '?sort=' + sortField + ',' + sortDirection })).toEqual({
        order: sortDirection,
        sort: sortField,
      });
    });
  });
});
/* TODO add unit tests */
