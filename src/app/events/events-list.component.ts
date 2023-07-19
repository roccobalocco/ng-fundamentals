import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/event.model';


@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr>
      <!-- *ngFor="let eventItem of events" -->
      <div class="row">
        <div class="col-md-6" *ngFor="let eventItem of events">
        <app-event-thumbnail
          [event]="eventItem">
        </app-event-thumbnail>
      </div>
    </div>
    `,  //[event] corrisponde ad event dentro a thumbanail,
        // event1 a quello qua sotto
})

export class EventsListComponent implements OnInit {
  events: IEvent[] | undefined

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.events = this.route.snapshot.data['events']
    // events è il nome della chiave in appRoutes,
    // presa dal servizio che prende dall'altro servizio
  }


}
