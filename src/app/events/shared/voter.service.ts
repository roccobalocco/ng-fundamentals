import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ISession } from './event.model';

@Injectable()
export class VoterService {

  constructor(private eventService: EventService) { }

  addVoter(session: ISession, user: string){
    this.eventService.searchSessions(session.name).subscribe(sessions => {
      sessions.forEach(s =>{
        s.voters.push(user)
      })
    })
  }

  deleteVoter(session: ISession, user: string){
    this.eventService.searchSessions(session.name).subscribe(sessions => {
      sessions.forEach(s =>{
        s.voters.pop(user)
      })
    })
  }

  userHasVoted(session: ISession, user: string): boolean{
    return session.voters.some(voter => voter === user)
  }

}
