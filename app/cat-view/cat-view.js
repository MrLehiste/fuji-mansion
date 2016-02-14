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
    var CatView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CatView = (function () {
                function CatView() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], CatView.prototype, "categories", void 0);
                CatView = __decorate([
                    core_1.Component({
                        selector: 'cat-view',
                        template: "\n<ul style=\"list-style-type: none;\">\n  <li *ngFor=\"#cat of categories\">\n    <span class=\"iconButton\" (click)=\"cat.toggle()\">{{cat.getIcon()}}</span>\n    <input type=\"checkbox\" [checked]=\"cat.checked\" (click)=\"cat.check()\" />\n    <img src={{cat.icon}}>\n    {{ cat.name }}\n    <div *ngIf=\"cat.expanded\">\n      <cat-view [categories]=\"cat.categories\"></cat-view>\n    </div>\n  </li>\n</ul>",
                        directives: [CatView]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CatView);
                return CatView;
            })();
            exports_1("CatView", CatView);
        }
    }
});
//# sourceMappingURL=cat-view.js.map