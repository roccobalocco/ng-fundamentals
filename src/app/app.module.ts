import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WelcomeComponent } from './welcome/welcome.component';
import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './event-thumbnail/event-thumbnail.component';
import { EventService } from './events/shared/event.service';
import { ToastrService } from './common/toastr.service';

@NgModule({
  declarations: [
    EventsAppComponent,
    WelcomeComponent,
    EventsListComponent,
    EventThumbnailComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [EventService, ToastrService],
  bootstrap: [EventsAppComponent, WelcomeComponent]
})
export class AppModule { }
