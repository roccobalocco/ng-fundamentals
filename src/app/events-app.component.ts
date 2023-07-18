import { Component } from '@angular/core';

@Component({
  selector: 'events-app-root',
  template: `
    <welcome-app-component></welcome-app-component>
    <events-list></events-list>
  `,
})
export class EventsAppComponent {
  title = 'ng-fundamentals';
}
