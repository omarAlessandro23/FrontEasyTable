import { Routes } from '@angular/router';
import { Reviewcomponent } from './components/reviewcomponent';
import { Reservationcomponent } from './components/reservationcomponent/reservationcomponent';

export const routes: Routes = [
  {
    path: 'reviews',
    component: Reviewcomponent
  },
  {
    path: 'reservations',
    component: Reservationcomponent
  },
  {
    path: '',
    redirectTo: 'reviews',
    pathMatch: 'full'
  }
];