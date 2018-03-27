import { expect } from 'chai';

import { loadMoreDataWhenScrolled } from '../../../react-jhipster';

describe('loadMoreDataWhenScrolled', () => {
  const setLinks = (first, last, prev) => ({ first, last, prev });
  const state = { entities: [{ 1: 'fake1' }, { 2: 'fake2' }, { 3: 'fake3' }] };
  const payload = { data: [{ 4: 'fake4' }, { 5: 'fake5' }] };
  const otherPayload = { data: [{ 7: 'fake7' }, { 8: 'fake8' }, { 9: 'fake9' }] };

  it('should return payload.data when there is only one page', () => {
    expect(loadMoreDataWhenScrolled(state.entities, payload.data, setLinks(0, 0, 0))).to.eql(payload.data);
  });

  it('should extend current entities if incoming data length and current entities length are not the same', () => {
    expect(loadMoreDataWhenScrolled(state.entities, payload.data, setLinks(0, 1, 0))).to.eql([...state.entities, ...payload.data]);
  });

  it('should extend current entities if incoming data is not the same as current data but have same length', () => {
    expect(loadMoreDataWhenScrolled(state.entities, otherPayload.data, setLinks(0, 1, 0))).to.eql([
      ...state.entities,
      ...otherPayload.data
    ]);
  });

  it('should return payload.data if links.prev is undefined (deleting element from first page)', () => {
    expect(loadMoreDataWhenScrolled(state.entities, otherPayload.data, setLinks(0, 0, undefined))).to.eql(otherPayload.data);
  });
});
