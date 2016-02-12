System.register(['angular2/core', 'angular2/router', './venue.service', './venue-list.component', './venue-detail.component', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, venue_service_1, venue_list_component_1, venue_detail_component_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (venue_service_1_1) {
                venue_service_1 = venue_service_1_1;
            },
            function (venue_list_component_1_1) {
                venue_list_component_1 = venue_list_component_1_1;
            },
            function (venue_detail_component_1_1) {
                venue_detail_component_1 = venue_detail_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_venueService) {
                    this._venueService = _venueService;
                    this.title = 'Tour of Venues';
                }
                AppComponent.prototype.onSelect = function (venue) { this.selectedVenue = venue; };
                AppComponent.prototype.getVenues = function () {
                    var _this = this;
                    this._venueService.getVenuesMock().then(function (venues) { return _this.venues = venues; });
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.getVenues();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'fuji-mansion-app',
                        template: "\n  <h1>{{title}}</h1>\n  <h2>My Venues List</h2>\n    <ul class=\"venues\">\n    <li *ngFor=\"#venue of venues\"\n      [class.selected]=\"venue === selectedVenue\"\n      (click)=\"onSelect(venue)\">\n      <span class=\"badge\"><img src={{venue.icon}}></span> {{venue.name}} in {{venue.formattedAddress}}\n    </li>\n    </ul>\n    <venue-list></venue-list>\n    <my-venue-detail [venue]=\"selectedVenue\"></my-venue-detail>\n  ",
                        directives: [venue_list_component_1.VenueListComponent, venue_detail_component_1.VenueDetailComponent],
                        providers: [http_1.HTTP_PROVIDERS, venue_service_1.VenueService],
                        styleUrls: ['app/venues.css']
                    }),
                    router_1.RouteConfig([
                        { path: '/venues', name: 'Venues', component: venue_list_component_1.VenueListComponent },
                        { path: '/venue/:id', name: 'VenueDetail', component: venue_detail_component_1.VenueDetailComponent },
                        { path: '/mockvenues', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', { id: 3 }] }
                    ]), 
                    __metadata('design:paramtypes', [venue_service_1.VenueService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map