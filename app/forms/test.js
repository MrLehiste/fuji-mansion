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
    var SimpleTestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SimpleTestComponent = (function () {
                function SimpleTestComponent() {
                }
                SimpleTestComponent.prototype.getSearchResults = function () {
                    console.log('userLoc: ' + this.userLoc);
                };
                SimpleTestComponent.prototype.ngOnInit = function () {
                    this.initGeoLocation();
                };
                SimpleTestComponent.prototype.initGeoLocation = function () {
                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            this.userLoc = position.coords.latitude + "," + position.coords.longitude;
                            console.log('userLoc: ' + this.userLoc);
                        });
                    }
                };
                SimpleTestComponent = __decorate([
                    core_1.Component({
                        selector: 'simple-test',
                        template: "<button type=\"button\" class=\"btn btn-primary\" (click)=\"getSearchResults()\">\n            <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span> Search Venues\n            </button>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleTestComponent);
                return SimpleTestComponent;
            })();
            exports_1("SimpleTestComponent", SimpleTestComponent);
        }
    }
});
//# sourceMappingURL=test.js.map