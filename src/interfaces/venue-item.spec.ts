
import {it, describe, expect} from 'angular2/testing';
import {VenueItem} from './venue-item';

describe('VenueItem', () => {
  it('class test', () => {
    let vItem = new VenueItem('1', 'first venue');
    expect(vItem.name).toEqual('first venue');
  });
  /*it('interface test', () => {
    let vItem: VenueItem = {id: '1', name: 'first venue'};
    expect(vItem.id).toEqual('1');
  });*/
});
