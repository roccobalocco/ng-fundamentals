import { Injectable } from '@angular/core';
import { ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) { }

  addVoter(eventId: number, session: ISession, voterName: string){
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    this.http.post(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`, {}, options)
      .pipe(catchError(this.handleError('addVoter'))).subscribe()
  }

  deleteVoter(eventId: number, session: ISession, voterName: string){

    session.voters = session.voters.filter(voter => voter != voterName)

    this.http.delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`)
      .pipe(catchError(this.handleError('deleteVoter'))).subscribe()
  }

  userHasVoted(session: ISession, user: string): boolean{
    return session.voters.some(voter => voter === user)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleError<T> (operation = 'operation', result?: T){
    return (error: unknown): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
}
