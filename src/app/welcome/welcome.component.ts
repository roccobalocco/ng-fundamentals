import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession } from '../events';
import { EventService } from '../events/shared/event.service';

@Component({
  selector: 'welcome-app-component',
  templateUrl: './welcome.component.html',
  styles: [`
    li > a.active { text-shadow: 2px 2px 10px white;}
  `]
})
export class WelcomeComponent {
  searchTerm?: string;
  foundSessions?: ISession[]

  constructor(public authService: AuthService, private eventService: EventService) { }

  searchSessions(searchTerm: string){
    if(searchTerm != undefined && searchTerm != null && searchTerm != "")
      this.eventService.searchSessions(searchTerm).subscribe(
        sessions => {
          this.foundSessions = sessions;
          console.log(this.foundSessions);
        }
      );
  }
}
