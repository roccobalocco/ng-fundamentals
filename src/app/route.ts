import { Routes } from '@angular/router'
import { EventDetailComponent } from "./events/event-detail/event-detail.component";
import { EventsListComponent } from "./events/events-list.component";
import { CreateEventComponent } from './events/shared/create-event.component';
import { Error404Component } from './error/404-component';
import { EventRouteActivator } from './events/event-detail/event-route.activator.service';
import { EventListResolverService } from './events/shared/event-list-resolver.service';

export const appRoutes: Routes = [
  //importante l'ordine delle routes
  { path: 'events/new', component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'] }, //funzione o servizio
  { path: 'events', component: EventsListComponent,
    resolve: {events: EventListResolverService} },
    //resolve per caricare i dati prima di caricare il componente
  { path: 'events/:id', component: EventDetailComponent,
    canActivate: [EventRouteActivator] },
  { path: '404', component: Error404Component},
  {
    path: 'user',
    // quando una rout inizia con user, carica il modulo user da questo percorso
    loadChildren: () => import('./user/user.module').then(m=> m.UserModule)
  },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
]
