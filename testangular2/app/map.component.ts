import {Component} from 'angular2/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';

import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-map',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES], // this loads all angular2-google-maps directives in this component
    // the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
    styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
    template: `
    <h1>{{loc}}</h1>

    <!-- this creates a google map on the page with the given lat/lng from the component as the initial center of the map: -->

    <sebm-google-map *ngIf="lat" [latitude]="lat" [longitude]="lng" [zoom]="15" (mapClick)="mapClicked($event)">
        <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'NANCY'">
        </sebm-google-map-marker>
    </sebm-google-map>
  `
})
export class MyMap {
    public lat: number;
    public lng: number;
    public key: String ="&key=AIzaSyCOWJ-iJGcYyAHvFooGnr7IVDXY7JgTSdc";
    public url: String="https://maps.googleapis.com/maps/api/geocode/json?sensor=false3"+this.key+"&latlng=";
    public loc: String;

    public http : Http;
    constructor(http: Http) {
        this.http=http;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(

                (position) => {
                    this.lat=position.coords.latitude;
                    this.lng=position.coords.longitude;
                    this.feed();
                }



            )
        }






    }

    feed() {

        this.http.get(this.url+this.lat+","+this.lng)
            .map(res => res.json())
            .subscribe(
                data => {
                    var results=data.results;
                    if (data.status=="OK") {
                        var level_1;
                        var level_2;
                        for (var x = 0, length_1 = results.length; x < length_1; x++){
                            for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++){
                                var type = results[x].address_components[y].types[0];
                                if ( type === "administrative_area_level_1") {
                                    level_1 = results[x].address_components[y].long_name;
                                    if (level_2) break;
                                } else if (type === "locality"){
                                    level_2 = results[x].address_components[y].long_name;
                                    if (level_1) break;
                                }
                            }
                        }
                        this.loc=level_2+", "+ level_1;
                    }

                }

            );

    }

    mapClicked(event: MouseEvent) {

            this.lat=event.coords.lat;
            this.lng=event.coords.lng;
            this.feed();

    }





}