import { LocationValidator } from './events/shared/location-validator.directory';
import { VoterService } from './events/shared/voter.service';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { window } from 'rxjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WelcomeComponent } from './welcome/welcome.component';
import { EventsAppComponent } from './events-app.component';
import { EventService } from './events/shared/event.service';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { JQUERY_TOKEN } from './common/jquery.service';
import { SimpleModalComponent } from './common/simple-modal.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { Error404Component } from './error/404-component';
import { CreateEventComponent, DurationPipe, EventListResolverService, EventThumbnailComponent, EventResolverService,
  EventsListComponent, EventDetailComponent, CreateSessionComponent, SessionListComponent} from './events/index';
import { AuthService } from './user/auth.service';
import { LoginComponent } from './user/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { FooterComponent } from './welcome/footer.component';
import { UpvoteComponent } from './events/event-detail/upvote.component';
import { HttpClientModule } from '@angular/common/http'
import { UserResolver } from './events/shared/user-resolver.service';

declare let toastr: Toastr
declare let jQuery: object

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
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr }, //inietto il mio servizio con un oggetto
    { provide: JQUERY_TOKEN, useValue: jQuery }, //inietto il mio servizio con un oggetto
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }, //forma prolissa, ma utile per funzioni in route
    EventListResolverService,
    EventResolverService,
    AuthService,
    VoterService,
    UserResolver
  ],
  bootstrap: [EventsAppComponent, WelcomeComponent, FooterComponent]
})

export class AppModule { }


export function checkDirtyState(component: CreateEventComponent){
  return component.isDirty
   ? window('You have not saved this event, do you really want to cancel?') : true
}

