System.register(['./venue', './mock-venues', 'angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var venue_1, mock_venues_1, core_1, http_1, Observable_1;
    var VenueService;
    return {
        setters:[
            function (venue_1_1) {
                venue_1 = venue_1_1;
            },
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
            }],
        execute: function() {
            VenueService = (function () {
                function VenueService(http) {
                    this.http = http;
                    this._venuesUrl = 'app/mock-venues.json';
                    this._venues4square1 = 'https://api.foursquare.com/v2/venues/517f1985e4b09ee45be0717e?v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
                    this._venues4square = 'https://api.foursquare.com/v2/venues/search?ll=32.536187,-117.008005&section=food&v=20151127&client_id=5LCPVBLQEUDUDDVSCQYXTIA4P10LP20C3LKZ5NBM4NQWCIPO&client_secret=XQKNMOWKX5RAV30XEJQLJIDVU2OJHJJRZJPB5PT0NWWNUWX2';
                }
                VenueService.prototype.getVenues = function () {
                    console.log('getVenues');
                    return this.http.get(this._venues4square)
                        .map(function (res) { return res.json().response.venues; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (resVenues) {
                        var result = [];
                        if (resVenues) {
                            resVenues.forEach(function (ven) {
                                console.log(ven.name);
                                result.push(new venue_1.Venue(ven.id, ven.name, ven.location.formattedAddress, ven.categories[0].icon.prefix + 'bg_32.png', ven.bestPhoto));
                            });
                        }
                        return result;
                    })
                        .catch(this.handleError);
                };
                VenueService.prototype.getVenuesJson = function () {
                    console.log('getVenues');
                    return this.http.get(this._venuesUrl)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .map(function (tasks) {
                        var result = [];
                        if (tasks) {
                            tasks.forEach(function (task) {
                                console.log(task.name);
                                result.push(new venue_1.Venue(task.id, task.name, task.formattedAddress, task.icon, task.bestPhoto));
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