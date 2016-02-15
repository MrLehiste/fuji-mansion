System.register(['./mock-venues', 'angular2/core', 'angular2/http', 'rxjs/Observable', './cat-view/cat-item'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var mock_venues_1, core_1, http_1, Observable_1, cat_item_1;
    var VenueService;
    return {
        setters:[
            function (mock_venues_1_1) {
                mock_venues_1 = mock_venues_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (cat_item_1_1) {
                cat_item_1 = cat_item_1_1;
            }],
        execute: function() {
            VenueService = (function () {
                function VenueService(http) {
                    this.http = http;
                    this._venuesUrl = 'app/mock-venues.json';
                    this._venues4square1 = 'https://api.foursquare.com/v2/venues/517f1985e4b09ee45be0717e?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
                    this._venues4square = 'https://api.foursquare.com/v2/venues/search?ll=32.536187,-117.008005&section=food&v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
                    this._explore4square = 'https://api.foursquare.com/v2/venues/explore?ll=32.536187,-117.008005&section=food&v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
                    this._api = 'https://api.foursquare.com/v2';
                    this._v = '20151127';
                    this._client_id = '5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO';
                    this._client_secret = 'XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
                }
                VenueService.prototype.getVenueById = function (venueId) {
                    console.log('getVenueById ' + venueId);
                    var venue4square1 = this._api + "/venues/" + venueId + "?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2";
                    return this.http.get(venue4square1)
                        .map(function (res) { return res.json().response.venue; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (ven) {
                        var iVenue = { id: ven.id, name: ven.name, formattedAddress: ven.location.formattedAddress,
                            canonicalUrl: ven.canonicalUrl };
                        if (ven.categories[0]) {
                            iVenue.icon = ven.categories[0].icon.prefix + 'bg_32.png';
                        }
                        if (ven.bestPhoto) {
                            iVenue.bestPhoto = ven.bestPhoto.prefix + 'width400' + ven.bestPhoto.suffix;
                        }
                        return iVenue;
                    })
                        .catch(this.handleError);
                };
                VenueService.prototype.searchVenues = function (searchFilter) {
                    var paraCat = (searchFilter.categoryId) ? '&categoryId=' + searchFilter.categoryId : '';
                    var paraQuery = (searchFilter.query) ? '&query=' + searchFilter.query : '';
                    var url_search = this._api + "/venues/search?ll=32.536187,-117.008005" + paraCat + paraQuery + "&v=" + this._v + "&client_id=" + this._client_id + "&client_secret=" + this._client_secret;
                    console.log('searchVenues: ' + url_search);
                    return this.http.get(url_search)
                        .map(function (res) { return res.json().response.venues; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (resVenues) {
                        var result = [];
                        if (resVenues) {
                            resVenues.forEach(function (ven) {
                                console.log(ven.name);
                                var iVenue = { id: ven.id, name: ven.name, formattedAddress: ven.location.formattedAddress };
                                if (ven.categories[0]) {
                                    iVenue.icon = ven.categories[0].icon.prefix + '32.png';
                                } //'bg_
                                result.push(iVenue);
                                //result.push(new Venue(ven.id, ven.name, ven.location.formattedAddress, ven.categories[0].icon.prefix + 'bg_32.png' || '', ven.bestPhoto));
                            });
                        }
                        return result;
                    })
                        .catch(this.handleError);
                };
                VenueService.prototype.getCategories = function () {
                    var _this = this;
                    console.log('getCategories');
                    var cat_url = this._api + "/venues/categories?v=" + this._v + "&client_id=" + this._client_id + "&client_secret=" + this._client_secret;
                    return this.http.get(cat_url)
                        .map(function (res) { return res.json().response.categories; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (cats) {
                        var result = [];
                        if (cats) {
                            cats.forEach(function (cat) {
                                console.log(cat.name);
                                //if(ven.categories[0]){ iVenue.icon = ven.categories[0].icon.prefix + 'bg_32.png' }
                                result.push(new cat_item_1.CatItem(cat.id, cat.name, cat.icon.prefix + 'bg_32.png', _this.getCatArray(cat.categories)));
                            });
                        }
                        console.log('RESULT');
                        console.log(result);
                        return result;
                    })
                        .catch(this.handleError);
                };
                VenueService.prototype.getCatArray = function (categories) {
                    var _this = this;
                    var result = [];
                    if (categories) {
                        categories.forEach(function (cat) {
                            //console.log('recursive ' + cat.name);
                            result.push(new cat_item_1.CatItem(cat.id, cat.name, cat.icon.prefix + 'bg_32.png', _this.getCatArray(cat.categories)));
                        });
                    }
                    return result;
                };
                VenueService.prototype.exploreVenues = function (exploreFilter) {
                    var url_explore = this._api + "/venues/explore?ll=32.536187,-117.008005&section=" + exploreFilter.section + "&v=" + this._v + "&client_id=" + this._client_id + "&client_secret=" + this._client_secret;
                    if (exploreFilter.query) {
                        url_explore = this._api + "/venues/explore?ll=32.536187,-117.008005&query=" + exploreFilter.query + "&v=" + this._v + "&client_id=" + this._client_id + "&client_secret=" + this._client_secret;
                    }
                    console.log('exploreVenues ' + url_explore);
                    return this.http.get(url_explore)
                        .map(function (res) { return res.json().response.groups[0].items; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (resVenues) {
                        var result = [];
                        if (resVenues) {
                            resVenues.forEach(function (ven) {
                                console.log(ven.venue.name);
                                var iVenue = { id: ven.venue.id, name: ven.venue.name, formattedAddress: ven.venue.location.formattedAddress,
                                    rating: ven.venue.rating, ratingColor: ven.venue.ratingColor, ratingSignals: ven.venue.ratingSignals };
                                if (ven.venue.categories[0]) {
                                    iVenue.icon = ven.venue.categories[0].icon.prefix + '32.png';
                                }
                                result.push(iVenue);
                                //result.push(new Venue(ven.id, ven.name, ven.location.formattedAddress, ven.categories[0].icon.prefix + 'bg_32.png' || '', ven.bestPhoto));
                            });
                        }
                        return result;
                    })
                        .catch(this.handleError);
                };
                VenueService.prototype.getVenuesJson = function () {
                    console.log('getVenuesJson()');
                    return this.http.get(this._venuesUrl)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (resVenues) {
                        var result = [];
                        if (resVenues) {
                            resVenues.forEach(function (ven) {
                                console.log(ven.name);
                                var iVenue = { id: ven.id, name: ven.name, formattedAddress: ven.formattedAddress, icon: ven.icon, bestPhoto: ven.bestPhoto };
                                result.push(iVenue);
                                //result.push(new Venue(ven.id, ven.name, ven.formattedAddress, ven.icon, ven.bestPhoto));
                            });
                        }
                        return result;
                    })
                        .catch(this.handleError);
                };
                VenueService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                VenueService.prototype.getVenuesMock = function () {
                    return Promise.resolve(mock_venues_1.VENUES);
                };
                // See the "Take it slow" appendix
                VenueService.prototype.getVenuesMockSlowly = function () {
                    return new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(mock_venues_1.VENUES); }, 2000);
                    } // 2 seconds
                     // 2 seconds
                    );
                };
                VenueService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], VenueService);
                return VenueService;
            })();
            exports_1("VenueService", VenueService);
        }
    }
});
//# sourceMappingURL=venue.service.js.map