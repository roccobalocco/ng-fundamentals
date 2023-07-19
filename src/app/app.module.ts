import { window } from 'rxjs';
import { NgModule, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WelcomeComponent } from './welcome/welcome.component';
import { EventsAppComponent } from './events-app.component';
import { EventService } from './events/shared/event.service';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { Error404Component } from './error/404-component';
import { EventRouteActivator } from './events/event-detail/event-route.activator.service';
import { CreateEventComponent, DurationPipe, EventListResolverService, EventThumbnailComponent, EventsListComponent, EventDetailComponent, CreateSessionComponent, SessionListComponent} from './events/index';
import { AuthService} from './user/auth.service';
import { LoginComponent } from './user/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CollapsibleWellComponent } from './events/event-detail/collapsible-well.component';
import { FooterComponent } from './welcome/footer.component';

declare let toastr: Toastr
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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    EventService,
    {provide: TOASTR_TOKEN, useValue: toastr}, //inietto il mio servizio con un oggetto
    { provide: EventRouteActivator, useClass: EventRouteActivator }, //inietto il mio servizio con una classe
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }, //forma prolissa, ma utile per funzioni in route
    EventListResolverService,
    AuthService,
  ],
  bootstrap: [EventsAppComponent, WelcomeComponent, FooterComponent]
})

export class AppModule { }


export function checkDirtyState(component: CreateEventComponent){
  return component.isDirty
   ? window('You have not saved this event, do you really want to cancel?') : true
}

