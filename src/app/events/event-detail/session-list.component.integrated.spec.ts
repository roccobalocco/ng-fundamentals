import { AuthService } from "src/app/user/auth.service"
import { VoterService } from "../shared/voter.service"
import { SessionListComponent } from "./session-list.component"
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core"
import { ISession } from "../shared/event.model"
import { DurationPipe } from "../shared/duration.pipe"
import { By } from "@angular/platform-browser"

describe('SessionListComponent', () => {

  let mockAuthService,
    mockVoterService,
    fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement

  beforeEach(() => {
    mockAuthService = { isAuthenticated : () => true,
      currentUser: { userName: 'Joe'}}
    mockVoterService = { userHasVoted: () => false }

    TestBed.configureTestingModule({
      declarations: [
        SessionListComponent,
        DurationPipe,
        // UpvoteComponent,
        // CollapsibleWellComponent
        //se commentiamo queste due, i figli del componente, otteniamo uno shallow test
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA //ignora gli errori di compilazione dei figli
      ]
    })
    fixture = TestBed.createComponent(SessionListComponent)
    component = fixture.componentInstance
    debugEl = fixture.debugElement
    element = fixture.nativeElement
  })

  describe('initial display', () => {
    it('Should have the correct session title', () => {
      // Arrange
      component.sessions = <ISession[]> [
        {name: 'session 1', level: 'intermediate', voters: ['john', 'bob'],
        presenter: 'Joe', duration: 1, abstract: 'abstract'}],
      component.filterBy = 'all'
      component.sortBy = 'name'
      component.eventId = 3
      component.ngOnChanges()

      // Act
      fixture.detectChanges() //aggiorna il binding

      // Assert
      expect(element.querySelector('[well-title]')?.textContent?.toLocaleLowerCase())
        .toContain('session 1')
      expect(component.sessions[0].name).toBe('session 1')
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent
      .toLocaleLowerCase()).toContain('session 1')
    })
  })
})
