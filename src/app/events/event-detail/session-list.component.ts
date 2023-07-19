import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared/event.model';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges{
  @Input() sessions!: ISession[];
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  filteredSessions : ISession[] = [];

  ngOnChanges(changes: SimpleChanges): void {
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


