import {Component, OnInit, EventEmitter, Output}   from 'angular2/core';
import {Venue}        from './venue';
//import {VenueService} from './venue.service';
@Component({
  selector: 'venue-list'
  ,template: `<div id="" style="overflow-y: scroll; height:480px; width: 360px;">
  <ul class="venues">
    <li *ngFor="#venue of venues"
      [class.selected]="venue === selectedVenue"
      (click)="onSelect(venue)">
      <span class="badge"><img src={{venue.icon}}></span> 
      <span *ngIf="venue.rating" class="btn btn-circle" style="background-color: #{{venue.ratingColor}}">{{venue.rating}}</span>
      &nbsp;{{venue.name}} <span *ngIf="venue.distance">({{venue.distance}} m)</span>
    </li>
  </ul></div>
  `
  ,styleUrls: ['app/venues.css']
  ,inputs: ['venues']
})
export class VenueListComponent { // implements OnInit
  public venues: Venue[];
  public selectedVenue: Venue;  
  errorMessage: string;
  
  @Output() venueClick: EventEmitter<Venue> = new EventEmitter();
  
  constructor () {  }  
  
  onSelect(venue: Venue) { 
    this.selectedVenue = venue;
    console.log('Venue Selected: ' + venue.name);
    this.venueClick.emit(venue);
  }
  
}