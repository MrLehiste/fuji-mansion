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
import {SearchFilter} from './forms/search-filter';

@Component({
    selector: 'fuji-mansion-app',
    template: `<h1 style="background:#f2efe9;">{{title}}</h1>
  <div class="leftColumn">  
    <ui-tabs>
      <template ui-pane title='Explore' active="true">
        <explore-form [nearloc]="searchLoc" (formSubmit)="exploreVenues($event)"></explore-form>
      </template>
      <template ui-pane title='Search'>
        <label>Location:</label>
        <input type="text" class="form-control" [(ngModel)]="searchLoc" style="width: 150px; display: inline;">
        <br>
        <label>Category:</label>
        <button type="button" class="btn btn-default" (click)="showHideCats()">
          <span class="glyphicon" [class.glyphicon-plus]="!_showCats" [class.glyphicon-minus]="_showCats" aria-hidden="true"></span> 
        </button>
        <div *ngIf="_showCats" style="display: inline;">
          <cat-view [categories]="categories"></cat-view>
        </div>
        <br>
        <label for="query">Search:</label>
        <input type="text" class="form-control" [(ngModel)]="searchQuery" style="width: 150px; display: inline;">
        
        <button type="button" class="btn btn-primary" (click)="getSearchResults()">
          <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search Venues
        </button>
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
  private _showCats: boolean = false;
  public searchQuery: string;
  public searchLoc: string;
  public userLoc: string;
  
  constructor(private _venueService: VenueService) { }
  
  showHideCats(){
    this._showCats = !this._showCats; 
  }
  
  onSelect(venue: Venue) {
    //console.log(`Selected venue: ${venue}`);
    this._venueService.getVenueById(venue.id).subscribe(venue => this.selectedVenue = venue);
  }
  
  exploreVenues(exploreFilter: ExploreFilter) {
    exploreFilter.ll = this.userLoc;
    this._venueService.exploreVenues(exploreFilter)
      .subscribe(
        venues => this.venueList = venues
        //,error =>  this.errorMessage = <any>error
      );
  }
  
  getSearchResults(){
    let result: Array<string> = [];
    
    if(this.categories.length > 0){
      this.categories.forEach(
        cat => {
          result.push.apply( result, cat.getCheckedIds() );
      });
    }
    console.log('searchLoc: ' + this.searchLoc);
    console.log('searchQuery: ' + this.searchQuery);
    console.log('userLoc: ' + this.userLoc);
    //console.log('# of SelectedCategories: ' + result.length);
    let srchFltr : SearchFilter = { 
        categoryId: result.toString()
        , query: this.searchQuery
        , near: this.searchLoc
        , ll: this.userLoc
    };
    this._venueService.searchVenues(srchFltr).subscribe(vens => this.venueList = vens);
    this._showCats = false;
  }
  
  ngOnInit() {
    this.searchLoc = "Corona, CA";
    this.getVenues();
    this.getCategories();
    this.initGeoLocation();
  }
  getVenues() {
    this._venueService.getVenuesMock().then(venues => this.venueList = venues);
  }
  getCategories() {
    this._venueService.getCategories().subscribe(cats => this.categories = cats);
  }
  initGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.userLoc = `${position.coords.latitude},${position.coords.longitude}`;
            console.log('initGeoLocation() userLoc: ' + this.userLoc);
        });
    } 
  }
  
}
