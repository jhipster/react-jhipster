import { expect } from 'chai';

import { loadMoreDataWhenScrolled } from '../../../react-jhipster';

describe('loadMoreDataWhenScrolled', () => {
  const setLinks = (first, last, prev) => ({ first, last, prev });
  const state = { entities: [{ 1: 'fake1' }, { 2: 'fake2' }, { 3: 'fake3' }] };
  const payload = { data: [{ 4: 'fake4' }, { 5: 'fake5' }] };
  const otherPayload = { data: [{ 7: 'fake7' }, { 8: 'fake8' }, { 9: 'fake9' }] };
  const itemsPerPage = 2;

  describe('When there is only one page', () => {
    it('should return payload.data when there is only one page', () => {
      expect(loadMoreDataWhenScrolled(state.entities, payload.data, setLinks(0, 0, 0), itemsPerPage)).to.eql(payload.data);
    });
  });

  describe('When current data and incoming data have same length', () => {
    it('should return payload.data if links.prev is undefined (deleting element from first page)', () => {
      expect(loadMoreDataWhenScrolled(state.entities, otherPayload.data, setLinks(0, 0, undefined), itemsPerPage)).to.eql(
        otherPayload.data
      );
    });

    it('should extend current entities if incoming data is not the same as current data', () => {
      expect(loadMoreDataWhenScrolled(state.entities, otherPayload.data, setLinks(0, 1, 0), itemsPerPage)).to.eql([
        ...state.entities,
        ...otherPayload.data
      ]);
    });
  });

  describe('When current data length is greater than incoming data length', () => {
    it('should extend current entities when scrolling', () => {
      expect(loadMoreDataWhenScrolled(state.entities, otherPayload.data, setLinks(0, 1, 0), itemsPerPage)).to.eql([
        ...state.entities,
        ...otherPayload.data
      ]);
    });

    it('should replace current data with incoming data when updating', () => {
      expect(loadMoreDataWhenScrolled(state.entities, payload.data, setLinks(0, 1, 0), itemsPerPage)).to.eql(payload.data);
    });
  });
});
