import { window } from 'rxjs';
import { NgModule, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WelcomeComponent } from './welcome/welcome.component';
import { EventsAppComponent } from './events-app.component';
import { EventService } from './events/shared/event.service';
import { ToastrService } from './common/toastr.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { Error404Component } from './error/404-component';
import { EventRouteActivator } from './events/event-detail/event-route.activator.service';
import { CreateEventComponent, DurationPipe, EventListResolverService, EventThumbnailComponent, EventsListComponent, EventDetailComponent, CreateSessionComponent, SessionListComponent} from './events/index';
import { AuthService} from './user/auth.service';
import { LoginComponent } from './user/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CollapsibleWellComponent } from './events/event-detail/collapsible-well.component';

@NgModule({
  declarations: [
    EventsAppComponent,
    WelcomeComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailComponent,
    CreateEventComponent,
    Error404Component,
    LoginComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EventService,
    ToastrService,
    EventRouteActivator,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }, //forma prolissa, ma utile per funzioni in route
    EventListResolverService,
    AuthService
  ],
  bootstrap: [EventsAppComponent, WelcomeComponent]
})
export class AppModule { }


export function checkDirtyState(component: CreateEventComponent){
  return component.isDirty
   ? window('You have not saved this event, do you really want to cancel?') : true
}

