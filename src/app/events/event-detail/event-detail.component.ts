import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../shared/event.model';

@Component({
  templateUrl: './event-detail.component.html',
  styles: [`
    .event-image { height: 100px; }
  `]
})

export class EventDetailComponent implements OnInit {
  event: IEvent | undefined
  id!: number

  constructor(private eventService: EventService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    this.id = Number(this.route.snapshot.params['id'])
    this.event = this.eventService.getEvent(this.id)
  }
}
