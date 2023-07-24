import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) { }

  addVoter(eventId: number, session: ISession, voterName: string){
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    this.http.post(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`, {}, options)
      .pipe(catchError(this.handleError('addVoter'))).subscribe()
  }

  deleteVoter(eventId: number, session: ISession, voterName: string){

    session.voters = session.voters.filter(voter => voter != voterName)

    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    this.http.delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`)
      .pipe(catchError(this.handleError('deleteVoter'))).subscribe()
  }

  userHasVoted(session: ISession, user: string): boolean{
    return session.voters.some(voter => voter === user)
  }

  public handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
}
