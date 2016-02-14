import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {Venue} from './venue';
import {VenueService} from './venue.service';
import {VenueListComponent}  from './venue-list.component';
import {VenueDetailComponent} from './venue-detail.component';
import {UiTabs, UiPane} from './ui-tabs';
import {ExploreFormComponent} from './forms/explore-form.component'
import {NgForm}    from 'angular2/common';
import {ExploreFilter} from './forms/explore-filter';
import {CatView} from './cat-view/cat-view';
import {CatItem} from './cat-view/cat-item';

@Component({
    selector: 'fuji-mansion-app',
    template: `<h1 style="background:#f2efe9;">{{title}}</h1>
  <div class="leftColumn">  
    <ui-tabs>
      <template ui-pane title='Explore' active="true">
        <explore-form (formSubmit)="exploreVenues($event)"></explore-form>
      </template>
      <template ui-pane title='Search'>
        <cat-view [categories]="categories"></cat-view>
      </template>
    </ui-tabs>
    <venue-list [venues]="venueList" (venueClick)="onSelect($event)"></venue-list>
  </div>
  <div class="rightColumn">
    <my-venue-detail [venue]="selectedVenue"></my-venue-detail>
  </div>
  `
    ,directives: [VenueListComponent, VenueDetailComponent, UiTabs, UiPane, ExploreFormComponent, CatView]
    ,providers: [HTTP_PROVIDERS, VenueService]
    ,styleUrls: ['app/venues.css']
})
//@ViewChild('exploreForm') NgForm exploreForm;

export class AppComponent implements OnInit {
  public title = 'Fuji Mansion';
  public selectedVenue: Venue;  
  public venueList: Venue[];
  categories: Array<CatItem>;
  
  constructor(private _venueService: VenueService) { }
  
  onSelect(venue: Venue) {
    console.log(`Selected venue: ${venue}`);
    this._venueService.getVenueById(venue.id).subscribe(venue => this.selectedVenue = venue);
  }
  
  exploreVenues(exploreFilter: ExploreFilter) {
    this._venueService.exploreVenues(exploreFilter)
      .subscribe(
        venues => this.venueList = venues
        //,error =>  this.errorMessage = <any>error
      );
  }
  
  ngOnInit() {
    this.getVenues();
    this.getCategories();
  }
  getVenues() {
    this._venueService.getVenuesMock().then(venues => this.venueList = venues);
  }
  getCategories() {
    this._venueService.getCategories().subscribe(cats => this.categories = cats);
  }
  
}
