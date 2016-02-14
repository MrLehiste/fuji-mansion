System.register([], function(exports_1) {
    var CatItem;
    return {
        setters:[],
        execute: function() {
            CatItem = (function () {
                function CatItem(id, name, icon, categories) {
                    this.id = id;
                    this.name = name;
                    this.icon = icon;
                    this.categories = categories;
                    this.expanded = false;
                    this.checked = false;
                }
                CatItem.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                CatItem.prototype.getIcon = function () {
                    if (this.categories.length == 0) {
                        return '';
                    }
                    if (this.expanded) {
                        return '-';
                    }
                    return '+';
                };
                CatItem.prototype.check = function () {
                    this.checked = !this.checked;
                    this.checkRecursive(this.checked);
                };
                CatItem.prototype.checkRecursive = function (state) {
                    this.categories.forEach(function (d) {
                        d.checked = state;
                        d.checkRecursive(state);
                    });
                };
                return CatItem;
            })();
            exports_1("CatItem", CatItem);
        }
    }
});
//# sourceMappingURL=cat-item.js.map