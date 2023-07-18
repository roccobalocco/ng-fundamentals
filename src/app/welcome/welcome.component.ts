import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
@Component({
  selector: 'welcome-app-component',
  templateUrl: './welcome.component.html',
  styles: [`
    li > a.active { text-shadow: 2px 2px 10px white;}
  `]
})
export class WelcomeComponent {
  constructor(public authService: AuthService) { }
}
