/*export interface Venue {
  id: string;
  name: string;
  formattedAddress: string;
  icon: string;
  bestPhoto: string;
}*/
System.register([], function(exports_1) {
    var Venue;
    return {
        setters:[],
        execute: function() {
            Venue = (function () {
                function Venue(id, name, formattedAddress, icon, bestPhoto) {
                    this.id = id;
                    this.name = name;
                    this.formattedAddress = formattedAddress;
                    this.icon = icon;
                    this.bestPhoto = bestPhoto;
                }
                return Venue;
            })();
            exports_1("Venue", Venue);
        }
    }
});
//# sourceMappingURL=venue.js.map