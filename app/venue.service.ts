import {Venue} from './venue';
import {VENUES} from './mock-venues';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class VenueService {
  constructor (private http: Http) {}
  private _venuesUrl = 'app/mock-venues.json';
  private _venues4square1 = 'https://api.foursquare.com/v2/venues/517f1985e4b09ee45be0717e?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
  private _venues4square = 'https://api.foursquare.com/v2/venues/search?ll=32.536187,-117.008005&section=food&v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';

  getVenueById (venueId: string) {
    console.log('getVenueById ' + venueId);
    let venue4square1 = `https://api.foursquare.com/v2/venues/${venueId}?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2`;
    //this._venues4square1 = 'https://api.foursquare.com/v2/venues/' + venueId + '?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
    
    return this.http.get(venue4square1)
        //.map(res => <Venue[]> res.json().data)
        .map(res => res.json().response.venue)
        .do(data => console.log(data)) // eyeball results in the console
        .map((ven) => {
            let iVenue: Venue = {id: ven.id, name: ven.name, formattedAddress: ven.location.formattedAddress};
            if(ven.categories[0]){ iVenue.icon = ven.categories[0].icon.prefix + 'bg_32.png' }
            if(ven.bestPhoto){ iVenue.bestPhoto = ven.bestPhoto.prefix + 'width400' + ven.bestPhoto.suffix }
            return iVenue;
        })
        .catch(this.handleError);
  }

  getVenues () {
    console.log('getVenues');
    return this.http.get(this._venues4square)
        //.map(res => <Venue[]> res.json().data)
        .map(res => res.json().response.venues)
        .do(data => console.log(data)) // eyeball results in the console
        .map((resVenues: Array<any>) => {
            let result:Array<Venue> = [];
            if (resVenues) {
                resVenues.forEach((ven) => {
                    console.log(ven.name);
                    var iVenue: Venue = {id: ven.id, name: ven.name, formattedAddress: ven.location.formattedAddress};
                    if(ven.categories[0]){ iVenue.icon = ven.categories[0].icon.prefix + 'bg_32.png' }
                    result.push(iVenue);
                    //result.push(new Venue(ven.id, ven.name, ven.location.formattedAddress, ven.categories[0].icon.prefix + 'bg_32.png' || '', ven.bestPhoto));
                });
            }
            return result;
        })
        .catch(this.handleError);
  }
  
  getVenuesJson () {
    console.log('getVenuesJson()');
    return this.http.get(this._venuesUrl)
        //.map(res => <Venue[]> res.json().data)
        .map(res => res.json())
        .do(data => console.log(data)) // eyeball results in the console
        .map((resVenues: Array<any>) => {
            let result:Array<Venue> = [];
            if (resVenues) {
                resVenues.forEach((ven) => {
                    console.log(ven.name);
                    var iVenue: Venue = {id: ven.id, name: ven.name, formattedAddress: ven.formattedAddress, icon: ven.icon, bestPhoto: ven.bestPhoto};
                    result.push(iVenue);
                    //result.push(new Venue(ven.id, ven.name, ven.formattedAddress, ven.icon, ven.bestPhoto));
                });
            }
            return result;
        })
        .catch(this.handleError);
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  getVenuesMock() {
    return Promise.resolve(VENUES);
  }
  // See the "Take it slow" appendix
  getVenuesMockSlowly() {
    return new Promise<Venue[]>(resolve =>
      setTimeout(()=>resolve(VENUES), 2000) // 2 seconds
    );
  }
}
