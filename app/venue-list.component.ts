import {Component, OnInit, EventEmitter, Output}   from 'angular2/core';
import {Venue}        from './venue';
import {VenueService} from './venue.service';
@Component({
  selector: 'venue-list'
  ,template: `New Venue List
  <ul class="venues">
    <li *ngFor="#venue of venues"
      [class.selected]="venue === selectedVenue"
      (click)="onSelect(venue)">
      <span class="badge"><img src={{venue.icon}}></span> {{venue.name}} in {{venue.formattedAddress}}
    </li>
  </ul>
  `
  ,styleUrls: ['app/venues.css']
  //,events: ['venueSelected']
})
export class VenueListComponent implements OnInit {
  public selectedVenue: Venue;  
  errorMessage: string;
  venues: Venue[];
  //venueSelected: EventEmitter<Venue>;
  @Output() venueClick: EventEmitter<Venue> = new EventEmitter();
  
  constructor (private _venueService: VenueService) {
      //this.venueSelected = new EventEmitter();
  }  
  
  onSelect(venue: Venue) { 
    this.selectedVenue = venue;
    console.log('Venue Selected: ' + venue.name);
    //this.venueSelected.emit(venue);
    this.venueClick.emit(venue);
  }
  
  ngOnInit() { this.getVenues(); }
  getVenues() {
    //this._venueService.getVenuesMock().then(venues => this.venues = venues);
    this._venueService.getVenues()
                     .subscribe(
                       venues => this.venues = venues,
                       error =>  this.errorMessage = <any>error);
  }
}