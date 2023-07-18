import { Component } from '@angular/core';

@Component({
  selector: 'events-app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class EventsAppComponent {
  title = 'ng-fundamentals';
}
