import { loadMoreDataWhenScrolled } from './pagination-utils';

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

/* TODO add unit tests */
