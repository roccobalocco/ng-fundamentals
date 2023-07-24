import { Component, Inject } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Toastr, TOASTR_TOKEN } from './common/toastr.service';

@Component({
  selector: 'events-app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class EventsAppComponent {
  constructor(private authService: AuthService, @Inject(TOASTR_TOKEN) private toastr: Toastr){

  }

  ngOnInit(){
    this.authService.checkAuthenticationStatus()
  }

}
