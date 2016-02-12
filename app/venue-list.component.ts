import {Component, OnInit}   from 'angular2/core';
import {Venue}        from './venue';
import {VenueService} from './venue.service';
@Component({
  selector: 'venue-list',
  template: `New Venue List
  <ul class="venues">
    <li *ngFor="#venue of venues"
      [class.selected]="venue === selectedVenue"
      (click)="onSelect(venue)">
      <span class="badge"><img src={{venue.icon}}></span> {{venue.name}} in {{venue.formattedAddress}}
    </li>
  </ul>
  `
  ,styleUrls: ['app/venues.css']
})
export class VenueListComponent implements OnInit {
  public selectedVenue: Venue;  
  constructor (private _venueService: VenueService) {}  
  errorMessage: string;
  venues: Venue[];
  onSelect(venue: Venue) { this.selectedVenue = venue; }
  ngOnInit() { this.getVenues(); }
  getVenues() {
    //this._venueService.getVenuesMock().then(venues => this.venues = venues);
    this._venueService.getVenues()
                     .subscribe(
                       venues => this.venues = venues,
                       error =>  this.errorMessage = <any>error);
  }
}