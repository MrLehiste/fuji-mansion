System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var VenueListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //import {VenueService} from './venue.service';
            VenueListComponent = (function () {
                function VenueListComponent() {
                    this.venueClick = new core_1.EventEmitter();
                }
                VenueListComponent.prototype.onSelect = function (venue) {
                    this.selectedVenue = venue;
                    console.log('Venue Selected: ' + venue.name);
                    this.venueClick.emit(venue);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], VenueListComponent.prototype, "venueClick", void 0);
                VenueListComponent = __decorate([
                    core_1.Component({
                        selector: 'venue-list',
                        template: "<div id=\"\" style=\"overflow-y: scroll; height:480px; width: 360px;\">\n  <ul class=\"venues\">\n    <li *ngFor=\"#venue of venues\"\n      [class.selected]=\"venue === selectedVenue\"\n      (click)=\"onSelect(venue)\">\n      <span class=\"badge\"><img src={{venue.icon}}></span> \n      <span *ngIf=\"venue.rating\" class=\"btn btn-circle\" style=\"background-color: #{{venue.ratingColor}}\">{{venue.rating}}</span>\n      &nbsp;{{venue.name}} <span *ngIf=\"venue.distance\">({{venue.distance}} m)</span>\n    </li>\n  </ul></div>\n  ",
                        styleUrls: ['app/venues.css'],
                        inputs: ['venues']
                    }), 
                    __metadata('design:paramtypes', [])
                ], VenueListComponent);
                return VenueListComponent;
            })();
            exports_1("VenueListComponent", VenueListComponent);
        }
    }
});
//# sourceMappingURL=venue-list.component.js.map