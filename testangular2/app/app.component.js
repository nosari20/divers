System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var VideosService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            VideosService = (function () {
                function VideosService(http) {
                    this.regionCode = "&regionCode=FR";
                    this.key = "&key=AIzaSyCOWJ-iJGcYyAHvFooGnr7IVDXY7JgTSdc";
                    this.url = "https://www.googleapis.com/youtube/v3/search?part=snippet&" + this.regionCode + this.key + "&q=";
                    this.http = http;
                    this.query = "";
                    this.feed();
                }
                VideosService.prototype.feed = function () {
                    var _this = this;
                    this.http.get(this.url + this.query)
                        .map(function (res) { return res.json().items; })
                        .subscribe(function (data) { _this.videos = data; });
                };
                VideosService = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <h1>Videos</h1>\n    <input [(ngModel)]=\"query\" (change)=\"feed()\" placeholder=\"search\">\n    <h2>Results for {{query}}</h2>\n    <ul>\n        <li *ngFor=\"#video of videos\">\n            <img src=\"{{video.snippet.thumbnails.default.url}}\">\n            <h2>{{video.snippet.title}}</h2>\n        </li>\n    </ul>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], VideosService);
                return VideosService;
            }());
            exports_1("VideosService", VideosService);
        }
    }
});
//# sourceMappingURL=app.component.js.map