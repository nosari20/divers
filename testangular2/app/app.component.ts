import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template:`
    <h1>Videos</h1>
    <input [(ngModel)]="query" (change)="feed()" placeholder="search">
    <h2>Results for {{query}}</h2>
    <ul>
        <li *ngFor="#video of videos">
            <img src="{{video.snippet.thumbnails.default.url}}">
            <h2>{{video.snippet.title}}</h2>
        </li>
    </ul>

    `
})

export class VideosService{

    public http : Http;
    public videos : Object;
    public query : String ;
    public regionCode="&regionCode=FR"
    public key="&key=AIzaSyCOWJ-iJGcYyAHvFooGnr7IVDXY7JgTSdc";

    public url = "https://www.googleapis.com/youtube/v3/search?part=snippet&"+this.regionCode+this.key+"&q=";


    constructor(http: Http) {
        this.http=http;
        this.query="";
        this.feed();

    }

    feed() {


        this.http.get(this.url+this.query)
            .map(res => res.json().items)
            .subscribe(
                data => {this.videos = data}

            );

    }


}


