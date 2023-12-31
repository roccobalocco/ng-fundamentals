import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';

@Component({
  templateUrl: './event-detail.component.html',
  styles: [`
    .event-image { height: 100px; }
    a { cursor:pointer; }
  `]
})

export class EventDetailComponent implements OnInit {
  event: IEvent | undefined
  addMode = false
  filterBy: string = 'all'
  sortBy: string = 'votes'

  constructor(private eventService: EventService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.data.forEach((data) => {
        this.addMode = false
        this.event = data['event']
    })
  }

  addSession() {
    this.addMode = !this.addMode
  }

  saveNewSession(session:ISession){
    const nextId = Math.max.apply(null, this.event!.sessions!.map(s => s.id))
    session.id = nextId + 1
    this.event!.sessions!.push(session)
    this.eventService.saveEvent(this.event!).subscribe()
    this.addMode = false
  }

  cancelAddSessions(){
    this.addMode = false
  }

  showSessions(level: string): void{
    this.filterBy = level
  }

  sortSessions(sortValue: string){
    this.sortBy = sortValue
  }

}
