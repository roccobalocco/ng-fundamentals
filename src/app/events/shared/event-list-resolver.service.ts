import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable()
export class EventListResolverService  {

  constructor(private eventService: EventService) { }

  resolve() {
    return this.eventService.getEvents();
  }
}
