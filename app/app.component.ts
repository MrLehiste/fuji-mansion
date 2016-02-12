import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Venue} from './venue';
import {VenueService} from './venue.service';
import {VenueListComponent}  from './venue-list.component';
import {VenueDetailComponent} from './venue-detail.component';

import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';


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
    <venue-list></venue-list>
    <my-venue-detail [venue]="selectedVenue"></my-venue-detail>
  `
    ,directives: [VenueListComponent, VenueDetailComponent]
    ,providers: [HTTP_PROVIDERS,VenueService]
    ,styleUrls: ['app/venues.css']
    //,styles:[``]
})
@RouteConfig([
  {path: '/venues',   name: 'Venues',     component: VenueListComponent},
  {path: '/venue/:id', name: 'VenueDetail', component: VenueDetailComponent},
  {path: '/mockvenues', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]}
])
export class AppComponent implements OnInit {
  public title = 'Tour of Venues';
  public selectedVenue: Venue;  
  public venues: Venue[];
  onSelect(venue: Venue) { this.selectedVenue = venue; }
  constructor(private _venueService: VenueService) { }
  getVenues() {
    this._venueService.getVenuesMock().then(venues => this.venues = venues);
  }
  ngOnInit() {
    this.getVenues();
  }
}
