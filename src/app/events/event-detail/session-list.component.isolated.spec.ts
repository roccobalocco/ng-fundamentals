import { SessionListComponent } from "./session-list.component"
import { AuthService } from "src/app/user/auth.service"
import { VoterService } from "../shared/voter.service"
import { ISession } from "../shared/event.model"

describe('SessionListComponent', () => {
  let component: SessionListComponent
  let mockAuthService: AuthService, mockVoterService: VoterService

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService)
  })

  describe('ngOnChanges', () => {
    it('Should filter the session correctly with intermediate level', () =>{
      let level = 'intermediate'
      component.sessions = <ISession[]> [
        {name: 'session 1', level: 'intermediate', voters: {}},
        {name: 'session 2', level: 'intermediate', voters: {}},
        {name: 'session 3', level: 'beginner', voters: {}}]
      component.filteredSessions = []
      component.filterBy = level
      component.sortBy = 'name'
      component.eventId = 3

      component.ngOnChanges()

      expect(component.filteredSessions.length).toBe(2)
      component.filteredSessions.forEach(session => {
        expect(session.level).toBe(level)
      });
    })
  })
})
