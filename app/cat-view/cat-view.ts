import {Component, Input} from 'angular2/core';
import {CatItem} from './cat-item';

@Component({
    selector: 'cat-view'
    ,template: `
<ul style="list-style-type: none;">
  <li *ngFor="#cat of categories">
    <span class="iconButton" (click)="cat.toggle()">{{cat.getIcon()}}</span>
    <input type="checkbox" [checked]="cat.checked" (click)="cat.check()" />
    <img src={{cat.icon}}>
    {{ cat.name }}
    <div *ngIf="cat.expanded">
      <cat-view [categories]="cat.categories"></cat-view>
    </div>
  </li>
</ul>`
    ,directives: [CatView]
})

export class CatView {
    @Input() categories: Array<CatItem>;
}