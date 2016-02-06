import {Component} from 'angular2/core';
import {Venue} from './venue';
import {VenueService} from './venue.service';
import {VenueDetailComponent} from './venue-detail.component';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'fuji-mansion-app',
    template: `
  <h1>{{title}}</h1>
  <h2>My Venues List</h2>
    <ul class="venues">
    <li *ngFor="#venue of venues"
      [class.selected]="venue === selectedVenue"
      (click)="onSelect(venue)">
      <span class="badge"><img src={{venue.icon}}></span> {{venue.name}} in {{venue.formattedAddress}}
    </li>
    </ul>
    <my-venue-detail [venue]="selectedVenue"></my-venue-detail>
  `
    ,directives: [VenueDetailComponent]
    ,providers: [VenueService]
    ,styleUrls: ['app/venues.css']
    //,styles:[``]
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
