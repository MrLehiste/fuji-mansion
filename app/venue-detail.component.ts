import {Component} from 'angular2/core';
import {Venue} from './venue';
@Component({
  selector: 'my-venue-detail',
  template: `
    <div *ngIf="venue">
      <h2>{{venue.name}} details!</h2>
      <div><label>id: </label>{{venue.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="venue.name" placeholder="name"/>
      </div>
      <div><label>Address: </label>{{venue.formattedAddress}}</div>
      <div><img src={{venue.bestPhoto}}></div>
    </div>
  `,
  inputs: ['venue']
})
export class VenueDetailComponent {
  public venue: Venue;
}