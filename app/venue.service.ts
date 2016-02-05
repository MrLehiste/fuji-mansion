import {Venue} from './venue';
import {VENUES} from './mock-venues';
import {Injectable} from 'angular2/core';

@Injectable()
export class VenueService {
  getVenues() {
    return Promise.resolve(VENUES);
  }
  // See the "Take it slow" appendix
  getVenuesSlowly() {
    return new Promise<Venue[]>(resolve =>
      setTimeout(()=>resolve(VENUES), 2000) // 2 seconds
    );
  }
}
