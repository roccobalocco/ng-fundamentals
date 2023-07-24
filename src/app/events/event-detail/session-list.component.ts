import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/event.model';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../shared/voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges{
  @Input() sessions!: ISession[];
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  @Input() eventId!: number
  filteredSessions : ISession[] = [];

  constructor(private authService: AuthService, private voterService: VoterService){}

  ngOnChanges(): void {
    if (this.sessions){
      this.filterSessions(this.filterBy)
      this.sortintgSessions(this.sortBy)
    }
  }

  filterSessions(filter: string){
    if (filter === 'all')
      this.filteredSessions = this.sessions.slice(0)
    else
      this.filteredSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter
      })
  }

  sortintgSessions(sortValue: string){
    if (sortValue === 'name')
      this.filteredSessions.sort(sortByNameAsc)
    else
      this.filteredSessions.sort(sortByValueDesc)
  }
  toggleVote(session: ISession): void {
    const user = this.authService.currentUser?.userName
    if(this.userHasVoted(session))
      this.voterService.deleteVoter(this.eventId, session, user!)
    else
      this.voterService.addVoter(this.eventId, session, user!)

      if (this.sortBy === 'votes')
        this.filteredSessions.sort(sortByValueDesc)
  }

  canVote(): boolean {
    return this.authService.isAuthenticated()
  }
  userHasVoted(session: ISession): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    return this.voterService.userHasVoted(session, this.authService.currentUser?.userName!)
  }
}

function sortByValueDesc(a: ISession, b: ISession): number {
  if(a.voters.length > b.voters.length) return -1
  else if (a.voters.length === b.voters.length) return 0
  else return 1
}

function sortByNameAsc(a: ISession, b: ISession): number {
  if (a.name > b.name) return 1
  else if (a.name === b.name) return 0
  else return -1
}


