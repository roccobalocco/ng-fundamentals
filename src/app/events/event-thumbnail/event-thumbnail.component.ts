import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from '../shared/event.model';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: [`
    .thumbnail { min-height: 330px; padding-left: 10px; padding-top: 10px; }
    .pad-left  { margin-left: 10px; }
    .well div { color: grey; }
    .green { color: green !important; }
    .red { color: red !important; }
    .bold { font-weight: bold; }
    .italic { font-style: italic; }
    .black{ color: black !important; }
  `]
})
export class EventThumbnailComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() event: IEvent | any //sarà passato da un altro componente
  @Output() eventClick = new EventEmitter()
  someProperty: string = 'some value in child component used as a variable'

  getStartPriceStyle(): object{
    //funzione atta a sostiuire la roba dentro l'espressione di ngClass
    if (this.event.price > 600)
      return {color: 'red'}
    return {color: 'green'}
  }
}
