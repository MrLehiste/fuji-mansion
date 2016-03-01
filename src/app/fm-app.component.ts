/* Main ng2 application component */
import {Component} from 'angular2/core';

@Component({
    selector: 'fm-app',
    template: '<h1>{{title}}</h1>'
})
export class FmAppComponent {
    public title = 'Fuji Mansion App';
}
