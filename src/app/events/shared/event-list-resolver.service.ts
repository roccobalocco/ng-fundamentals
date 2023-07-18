import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './event.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EventListResolverService implements Resolve<any> {

  constructor(private eventService: EventService) { }

  resolve() {
    //pipe per far ritornare un observable e non una subscribtion
    return this.eventService.getEvents().pipe(map(events => events))
  }
}
