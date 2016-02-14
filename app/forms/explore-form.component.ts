import {Component, View, EventEmitter, Output} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from 'angular2/common';
import {ExploreFilter} from './explore-filter';

@Component({
  selector: 'explore-form'
})
@View({
  template: `
  <form [ngFormModel]="exploreForm" #f="ngForm" (ngSubmit)="onSubmit(f.value)">
    <div class="form-group" style="padding-top: 5px;">
      <div style="display: inline;">
        <label for="section">Pick Section:</label>
        <select class="form-control" required style="width: 120px; display: inline;"
            ngControl="section" #section="ngForm" >
            <option *ngFor="#sect of sections" [value]="sect">{{sect}}</option>
        </select>
        <br>
        <label for="query">Search:</label>
        <input type="text" class="form-control" ngControl="query" style="width: 150px; display: inline;">
      </div>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="!f.valid">
      <span class="glyphicon glyphicon-cutlery" aria-hidden="true"></span> Explore Venues
    </button>
  </form>`
  ,directives: [FORM_DIRECTIVES]
})
export class ExploreFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  sections = ['food', 'drinks', 'coffee', 'shops', 'arts', 'outdoors', 'sights'
    , 'trending', 'specials'
    , 'nextVenues', 'topPicks'];
  onSubmit(value: string): void {
    console.log('you submitted value: ', value); 
    this.formSubmit.emit(value);
  }
  exploreForm: ControlGroup;
 
  constructor() {
    var fb = new FormBuilder();
    this.exploreForm = fb.group({
      section: ['coffee', Validators.required]
      ,query: ['']
    });
  }
}
