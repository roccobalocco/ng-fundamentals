import { Routes } from '@angular/router'
import { Error404Component } from './error/404-component';
import { CreateEventComponent, EventListResolverService, EventsListComponent, EventDetailComponent, CreateSessionComponent, EventResolverService } from './events/index';

export const appRoutes: Routes = [
  //importante l'ordine delle routes
  { path: 'events/new', component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'] }, //funzione o servizio
  { path: 'events', component: EventsListComponent,
    resolve: {events: EventListResolverService} },
    //resolve per caricare i dati prima di caricare il componente
  { path: 'events/:id', component: EventDetailComponent, resolve: {event: EventResolverService} },
  { path: '404', component: Error404Component},
  {
    path: 'user',
    // quando una rout inizia con user, carica il modulo user da questo percorso
    loadChildren: () => import('./user/user.module').then(m=> m.UserModule)
  },
  { path: 'events/session/new', component: CreateSessionComponent},
  { path: '', redirectTo: '/events', pathMatch: 'full' }
]
