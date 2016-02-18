    import {Component} from 'angular2/core';
    import {OnInit} from 'angular2/core';

    @Component({
        selector: 'simple-test',
        template: `<button type="button" class="btn btn-primary" (click)="getSearchResults()">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search Venues
            </button>`
    })

    export class SimpleTestComponent implements OnInit {
    public userLoc: string;
    constructor() { }
    getSearchResults(){
        console.log('userLoc: ' + this.userLoc);
    }
    
    ngOnInit() {
        this.initGeoLocation();
    }
    initGeoLocation() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            this.userLoc = `${position.coords.latitude},${position.coords.longitude}`;
            console.log('userLoc: ' + this.userLoc);
        });
        } 
    }
    
    }
