import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';


@Component({
  selector: 'events-list',
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr>
      <!-- *ngFor="let eventItem of events" -->
      <div class="row">
        <div class="col-md-6" *ngFor="let eventItem of events">
        <app-event-thumbnail
          (click) = "handleThumbnailClick(eventItem.name)"
          [event]="eventItem">
        </app-event-thumbnail>
      </div>
    </div>
    `,  //[event] corrisponde ad event dentro a thumbanail,
        // event1 a quello qua sotto
})

export class EventsListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    this.events = this.eventService.getEvents()
  }

  handleThumbnailClick(eventName: string) {
    this.toastrService.success(`Event: ${eventName} clicked`);
  }
}
