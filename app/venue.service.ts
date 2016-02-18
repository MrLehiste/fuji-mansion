import {Venue} from './venue';
import {VENUES} from './mock-venues';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {ExploreFilter} from './forms/explore-filter';
import {CatItem} from './cat-view/cat-item';
import {SearchFilter} from './forms/search-filter';

@Injectable()
export class VenueService {
  constructor (private http: Http) {}
  private _venuesUrl = 'app/mock-venues.json';
  private _venues4square1 = 'https://api.foursquare.com/v2/venues/517f1985e4b09ee45be0717e?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
  private _venues4square = 'https://api.foursquare.com/v2/venues/search?ll=32.536187,-117.008005&section=food&v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
  private _explore4square = 'https://api.foursquare.com/v2/venues/explore?ll=32.536187,-117.008005&section=food&v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
  
  private _default_ll = '32.536187,-117.008005';
  private _api = 'https://api.foursquare.com/v2';
  private _v = '20151127';
  private _client_id = '5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO';
  private _client_secret = 'XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';

  getVenueById (venueId: string) {
    console.log('getVenueById ' + venueId);
    let venue4square1 = `${this._api}/venues/${venueId}?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2`;
    return this.http.get(venue4square1)
        .map(res => res.json().response.venue)
        //.do(data => console.log(data)) // eyeball results in the console
        .map((ven) => {
            let iVenue: Venue = {id: ven.id, name: ven.name, formattedAddress: ven.location.formattedAddress
                , canonicalUrl: ven.canonicalUrl};
            if(ven.categories[0]){ iVenue.icon = ven.categories[0].icon.prefix + 'bg_32.png' }
            if(ven.bestPhoto){ iVenue.bestPhoto = ven.bestPhoto.prefix + 'width400' + ven.bestPhoto.suffix }
            return iVenue;
        })
        .catch(this.handleError);
  }

  searchVenues (searchFilter: SearchFilter) {
    let paraCat = (searchFilter.categoryId) ? '&categoryId=' + searchFilter.categoryId : '';
    let paraQuery = (searchFilter.query) ? '&query=' + searchFilter.query : '';
    let paraLoc = (searchFilter.near) ? 'near=' + searchFilter.near : 'll=' + (searchFilter.ll || this._default_ll);
    let url_search = `${this._api}/venues/search?${paraLoc}${paraCat}${paraQuery}&v=${this._v}&client_id=${this._client_id}&client_secret=${this._client_secret}`;
    console.log('searchVenues: ' + url_search);
    return this.http.get(url_search)
        .map(res => res.json().response.venues)
        //.do(data => console.log(data)) // eyeball results in the console
        .map((resVenues: Array<any>) => {
            let result:Array<Venue> = [];
            if (resVenues) {
                resVenues.forEach((ven) => {
                    //console.log(ven.name);
                    var iVenue: Venue = {id: ven.id, name: ven.name, formattedAddress: ven.location.formattedAddress};
                    if(ven.categories[0]){ iVenue.icon = ven.categories[0].icon.prefix + '32.png' } //'bg_
                    result.push(iVenue);
                    //result.push(new Venue(ven.id, ven.name, ven.location.formattedAddress, ven.categories[0].icon.prefix + 'bg_32.png' || '', ven.bestPhoto));
                });
            }
            console.log('# of Search Results: ' + result.length);
            return result;
        })
        .catch(this.handleError);
  }
  
  getCategories () {
    //console.log('getCategories');
    let cat_url = `${this._api}/venues/categories?v=${this._v}&client_id=${this._client_id}&client_secret=${this._client_secret}`;
    return this.http.get(cat_url)
        .map(res => res.json().response.categories)
        //.do(data => console.log(data)) // eyeball results in the console
        .map((cats: Array<any>) => {
            let result:Array<CatItem> = [];
            if (cats) {
                cats.forEach((cat) => {
                    //console.log(cat.name);
                    //if(ven.categories[0]){ iVenue.icon = ven.categories[0].icon.prefix + 'bg_32.png' }
                    result.push(new CatItem(cat.id, cat.name, cat.icon.prefix + 'bg_32.png'
                    , this.getCatArray(cat.categories)
                    ));
                });
            }
            console.log('getCategories() RESULT');
            console.log(result);
            return result;
        })
        .catch(this.handleError);
  }
  
  getCatArray(categories){
      let result:Array<CatItem> = [];
      if(categories){
        categories.forEach(
          (cat) => {
            //console.log('recursive ' + cat.name);
            result.push(new CatItem(cat.id, cat.name, cat.icon.prefix + 'bg_32.png'
                    ,this.getCatArray(cat.categories)
                    ));
          }
        );
      }
      return result;
  }
  
  exploreVenues(exploreFilter: ExploreFilter) {
    let paraSectionOrQuery = (exploreFilter.section) ? '&section=' + exploreFilter.section : '';
    paraSectionOrQuery = (exploreFilter.query) ? '&query=' + exploreFilter.query : paraSectionOrQuery;
    let paraLoc = (exploreFilter.near) ? 'near=' + exploreFilter.near : 'll=' + (exploreFilter.ll || this._default_ll);
    let url_explore = `${this._api}/venues/explore?${paraLoc}${paraSectionOrQuery}&v=${this._v}&client_id=${this._client_id}&client_secret=${this._client_secret}`;
    //let url_explore = `${this._api}/venues/explore?ll=32.536187,-117.008005&section=${exploreFilter.section}&v=${this._v}&client_id=${this._client_id}&client_secret=${this._client_secret}`;
    //if(exploreFilter.query){ url_explore = `${this._api}/venues/explore?ll=32.536187,-117.008005&query=${exploreFilter.query}&v=${this._v}&client_id=${this._client_id}&client_secret=${this._client_secret}`; }
    console.log('exploreVenues ' + url_explore);
    return this.http.get(url_explore)
        .map(res => res.json().response.groups[0].items)
        //.do(data => console.log(data)) // eyeball results in the console
        .map((resVenues: Array<any>) => {
            let result:Array<Venue> = [];
            if (resVenues) {
                resVenues.forEach((ven) => {
                    console.log(ven.venue.name);
                    var iVenue: Venue = {id: ven.venue.id, name: ven.venue.name, formattedAddress: ven.venue.location.formattedAddress
                        , rating: ven.venue.rating, ratingColor: ven.venue.ratingColor, ratingSignals: ven.venue.ratingSignals};
                    if(ven.venue.categories[0]){ iVenue.icon = ven.venue.categories[0].icon.prefix + '32.png' }
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
        //.do(data => console.log(data)) // eyeball results in the console
        .map((resVenues: Array<any>) => {
            let result:Array<Venue> = [];
            if (resVenues) {
                resVenues.forEach((ven) => {
                    console.log(ven.name);
                    let iVenue: Venue = {id: ven.id, name: ven.name, formattedAddress: ven.formattedAddress, icon: ven.icon, bestPhoto: ven.bestPhoto};
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
