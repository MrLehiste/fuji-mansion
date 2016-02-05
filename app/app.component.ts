import {Component} from 'angular2/core';
import {Venue} from './venue';
import {VenueService} from './venue.service';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'fuji-mansion-app',
    template: `
  <h1>{{title}}</h1>
  <h2>My Venues</h2>
    <ul class="venues">
    <li *ngFor="#venue of venues"
      [class.selected]="venue === selectedVenue"
      (click)="onSelect(venue)">
      <span class="badge">{{venue.id}}</span> {{venue.name}}
    </li>
    </ul>
  `
    ,directives: []
    ,providers: [VenueService]
})
export class AppComponent implements OnInit {
  public title = 'Tour of Venues';
  public selectedVenue: Venue;  
  public venues: Venue[];
  onSelect(venue: Venue) { this.selectedVenue = venue; }
  constructor(private _venueService: VenueService) { }
  getVenues() {
    this._venueService.getVenuesSlowly().then(venues => this.venues = venues);
  }
  ngOnInit() {
    this.getVenues();
  }
}