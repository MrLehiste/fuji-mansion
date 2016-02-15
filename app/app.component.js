System.register(['angular2/core', 'angular2/http', './venue.service', './venue-list.component', './venue-detail.component', './ui-tabs', './forms/explore-form.component', './cat-view/cat-view'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, venue_service_1, venue_list_component_1, venue_detail_component_1, ui_tabs_1, explore_form_component_1, cat_view_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
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
            function (ui_tabs_1_1) {
                ui_tabs_1 = ui_tabs_1_1;
            },
            function (explore_form_component_1_1) {
                explore_form_component_1 = explore_form_component_1_1;
            },
            function (cat_view_1_1) {
                cat_view_1 = cat_view_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_venueService) {
                    this._venueService = _venueService;
                    this.title = 'Fuji Mansion';
                    this._showCats = false;
                }
                AppComponent.prototype.showHideCats = function () {
                    this._showCats = !this._showCats;
                };
                AppComponent.prototype.onSelect = function (venue) {
                    var _this = this;
                    console.log("Selected venue: " + venue);
                    this._venueService.getVenueById(venue.id).subscribe(function (venue) { return _this.selectedVenue = venue; });
                };
                AppComponent.prototype.exploreVenues = function (exploreFilter) {
                    var _this = this;
                    this._venueService.exploreVenues(exploreFilter)
                        .subscribe(function (venues) { return _this.venueList = venues; });
                };
                AppComponent.prototype.getSelectedCategories = function () {
                    var _this = this;
                    var result = [];
                    if (this.categories.length > 0) {
                        this.categories.forEach(function (cat) {
                            result.push.apply(result, cat.getCheckedIds());
                        });
                    }
                    console.log('RESULT:' + result.toString());
                    var srchFltr = { categoryId: result.toString(), query: this.searchQuery };
                    this._venueService.searchVenues(srchFltr).subscribe(function (vens) { return _this.venueList = vens; });
                    this._showCats = false;
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.getVenues();
                    this.getCategories();
                };
                AppComponent.prototype.getVenues = function () {
                    var _this = this;
                    this._venueService.getVenuesMock().then(function (venues) { return _this.venueList = venues; });
                };
                AppComponent.prototype.getCategories = function () {
                    var _this = this;
                    this._venueService.getCategories().subscribe(function (cats) { return _this.categories = cats; });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'fuji-mansion-app',
                        template: "<h1 style=\"background:#f2efe9;\">{{title}}</h1>\n  <div class=\"leftColumn\">  \n    <ui-tabs>\n      <template ui-pane title='Explore' active=\"true\">\n        <explore-form (formSubmit)=\"exploreVenues($event)\"></explore-form>\n      </template>\n      <template ui-pane title='Search'>\n        <label>Category:</label>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"showHideCats()\">\n          <span class=\"glyphicon\" [class.glyphicon-plus]=\"!_showCats\" [class.glyphicon-minus]=\"_showCats\" aria-hidden=\"true\"></span> \n        </button>\n        <div *ngIf=\"_showCats\" style=\"display: inline;\">\n          <cat-view [categories]=\"categories\"></cat-view>\n        </div>\n        <br>\n        <label for=\"query\">Search:</label>\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"searchQuery\" style=\"width: 150px; display: inline;\">\n        \n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"getSelectedCategories()\">\n          <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span> Search Venues\n        </button>\n      </template>\n    </ui-tabs>\n    <venue-list [venues]=\"venueList\" (venueClick)=\"onSelect($event)\"></venue-list>\n  </div>\n  <div class=\"rightColumn\">\n    <my-venue-detail [venue]=\"selectedVenue\"></my-venue-detail>\n  </div>\n  ",
                        directives: [venue_list_component_1.VenueListComponent, venue_detail_component_1.VenueDetailComponent, ui_tabs_1.UiTabs, ui_tabs_1.UiPane, explore_form_component_1.ExploreFormComponent, cat_view_1.CatView],
                        providers: [http_1.HTTP_PROVIDERS, venue_service_1.VenueService],
                        styleUrls: ['app/venues.css']
                    }), 
                    __metadata('design:paramtypes', [venue_service_1.VenueService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map