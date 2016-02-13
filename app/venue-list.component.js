System.register(['angular2/core', './venue.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, venue_service_1;
    var VenueListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (venue_service_1_1) {
                venue_service_1 = venue_service_1_1;
            }],
        execute: function() {
            VenueListComponent = (function () {
                function VenueListComponent(_venueService) {
                    this._venueService = _venueService;
                    //venueSelected: EventEmitter<Venue>;
                    this.venueClick = new core_1.EventEmitter();
                    //this.venueSelected = new EventEmitter();
                }
                VenueListComponent.prototype.onSelect = function (venue) {
                    this.selectedVenue = venue;
                    console.log('Venue Selected: ' + venue.name);
                    //this.venueSelected.emit(venue);
                    this.venueClick.emit(venue);
                };
                VenueListComponent.prototype.ngOnInit = function () { this.getVenues(); };
                VenueListComponent.prototype.getVenues = function () {
                    var _this = this;
                    //this._venueService.getVenuesMock().then(venues => this.venues = venues);
                    this._venueService.exploreVenues()
                        .subscribe(function (venues) { return _this.venues = venues; }, function (error) { return _this.errorMessage = error; });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], VenueListComponent.prototype, "venueClick", void 0);
                VenueListComponent = __decorate([
                    core_1.Component({
                        selector: 'venue-list',
                        template: "New Venue List\n  <ul class=\"venues\">\n    <li *ngFor=\"#venue of venues\"\n      [class.selected]=\"venue === selectedVenue\"\n      (click)=\"onSelect(venue)\">\n      <span class=\"badge\"><img src={{venue.icon}}></span> {{venue.name}} \n    </li>\n  </ul>\n  ",
                        styleUrls: ['app/venues.css']
                    }), 
                    __metadata('design:paramtypes', [venue_service_1.VenueService])
                ], VenueListComponent);
                return VenueListComponent;
            })();
            exports_1("VenueListComponent", VenueListComponent);
        }
    }
});
//# sourceMappingURL=venue-list.component.js.map