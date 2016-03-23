import {bootstrap}    from 'angular2/platform/browser';
import {VideosService} from './app.component';
import {MyMap} from './map.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

bootstrap(VideosService,[
    HTTP_PROVIDERS,
]);


bootstrap(MyMap, [
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    HTTP_PROVIDERS
]);