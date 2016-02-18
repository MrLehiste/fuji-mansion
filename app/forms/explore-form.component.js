System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var ExploreFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ExploreFormComponent = (function () {
                function ExploreFormComponent() {
                    //@Input() nearloc: string;
                    this.formSubmit = new core_1.EventEmitter();
                    this.sections = ['food', 'drinks', 'coffee', 'shops', 'arts', 'outdoors', 'sights',
                        'trending', 'specials',
                        'nextVenues', 'topPicks'];
                    var fb = new common_1.FormBuilder();
                    this.exploreForm = fb.group({
                        section: ['coffee', common_1.Validators.required],
                        query: [''],
                        near: ['']
                    });
                }
                ExploreFormComponent.prototype.onSubmit = function (value) {
                    console.log('you submitted value: ', value);
                    this.formSubmit.emit(value);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ExploreFormComponent.prototype, "formSubmit", void 0);
                ExploreFormComponent = __decorate([
                    core_1.Component({
                        selector: 'explore-form'
                    }),
                    core_1.View({
                        template: "\n  <form [ngFormModel]=\"exploreForm\" #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.value)\">\n    <div class=\"form-group\" style=\"padding-top: 5px;\">\n      <label for=\"near\">Location:</label>\n      <input type=\"text\" class=\"form-control\" ngControl=\"near\" [value]=\"nearloc\" style=\"width: 150px; display: inline;\">\n      <br>\n      <div style=\"display: inline;\">\n        <label for=\"section\">Pick Section:</label>\n        <select class=\"form-control\" required style=\"width: 120px; display: inline;\"\n            ngControl=\"section\" #section=\"ngForm\" >\n            <option *ngFor=\"#sect of sections\" [value]=\"sect\">{{sect}}</option>\n        </select>\n        <br>\n        <label for=\"query\">Search:</label>\n        <input type=\"text\" class=\"form-control\" ngControl=\"query\" style=\"width: 150px; display: inline;\">\n      </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!f.valid\">\n      <span class=\"glyphicon glyphicon-cutlery\" aria-hidden=\"true\"></span> Explore Venues\n    </button>\n  </form>",
                        directives: [common_1.FORM_DIRECTIVES],
                        inputs: ['nearloc']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ExploreFormComponent);
                return ExploreFormComponent;
            })();
            exports_1("ExploreFormComponent", ExploreFormComponent);
        }
    }
});
//# sourceMappingURL=explore-form.component.js.map