System.register(['angular2/core', 'angular2-google-maps/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, http_1;
    var MyMap;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            MyMap = (function () {
                function MyMap(http) {
                    var _this = this;
                    this.key = "&key=AIzaSyCOWJ-iJGcYyAHvFooGnr7IVDXY7JgTSdc";
                    this.url = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false3" + this.key + "&latlng=";
                    this.http = http;
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            _this.lat = position.coords.latitude;
                            _this.lng = position.coords.longitude;
                            _this.feed();
                        });
                    }
                }
                MyMap.prototype.feed = function () {
                    var _this = this;
                    this.http.get(this.url + this.lat + "," + this.lng)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        var results = data.results;
                        if (data.status == "OK") {
                            var level_1;
                            var level_2;
                            for (var x = 0, length_1 = results.length; x < length_1; x++) {
                                for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++) {
                                    var type = results[x].address_components[y].types[0];
                                    if (type === "administrative_area_level_1") {
                                        level_1 = results[x].address_components[y].long_name;
                                        if (level_2)
                                            break;
                                    }
                                    else if (type === "locality") {
                                        level_2 = results[x].address_components[y].long_name;
                                        if (level_1)
                                            break;
                                    }
                                }
                            }
                            _this.loc = level_2 + ", " + level_1;
                        }
                    });
                };
                MyMap.prototype.mapClicked = function (event) {
                    this.lat = event.coords.lat;
                    this.lng = event.coords.lng;
                    this.feed();
                };
                MyMap = __decorate([
                    core_1.Component({
                        selector: 'my-map',
                        directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
                        // the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
                        styles: ["\n    .sebm-google-map-container {\n      height: 300px;\n    }\n  "],
                        template: "\n    <h1>{{loc}}</h1>\n\n    <!-- this creates a google map on the page with the given lat/lng from the component as the initial center of the map: -->\n\n    <sebm-google-map *ngIf=\"lat\" [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"15\" (mapClick)=\"mapClicked($event)\">\n        <sebm-google-map-marker [latitude]=\"lat\" [longitude]=\"lng\" [label]=\"'NANCY'\">\n        </sebm-google-map-marker>\n    </sebm-google-map>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MyMap);
                return MyMap;
            }());
            exports_1("MyMap", MyMap);
        }
    }
});
//# sourceMappingURL=map.component.js.map