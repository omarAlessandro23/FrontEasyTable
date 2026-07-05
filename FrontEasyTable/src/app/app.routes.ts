import { Routes } from '@angular/router';
import { CategoryInsertComponent } from './components/category/categoryinsert/categoryinsert';
import { CategoryListComponent } from './components/category/categorylist/categorylist';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { UsuarioInsert } from './components/usuariocomponent/usuario-insert/usuario-insert';
import { Categoryupdate } from './components/category/categoryupdate/categoryupdate';
import { Restaurantcomponent } from './components/restaurantcomponent/restaurantcomponent';
import { Restaurantinsert } from './components/restaurantcomponent/restaurantinsert/restaurantinsert';
import { Restaurantlist } from './components/restaurantcomponent/restaurantlist/restaurantlist';
import { Schedulecomponent } from './components/schedulecomponent/schedulecomponent';
import { Scheduleinsert } from './components/schedulecomponent/scheduleinsert/scheduleinsert';
import { Schedulelist } from './components/schedulecomponent/schedulelist/schedulelist';
import { Restauranttablecomponent } from './components/restauranttablecomponent/restauranttablecomponent';
import { Restauranttableinsert } from './components/restauranttablecomponent/restauranttableinsert/restauranttableinsert';
import { RestaurantTablelist } from './components/restauranttablecomponent/restauranttablelist/restauranttablelist';
import { Authenticate } from './components/authenticate/authenticate';
import { seguridadGuard } from './guard/seguridad-guard';
import { Usuarioupdate } from './components/usuariocomponent/usuarioupdate/usuarioupdate';
import { Restaurantupdate } from './components/restaurantcomponent/restaurantupdate/restaurantupdate';
import { Scheduleupdate } from './components/schedulecomponent/scheduleupdate/scheduleupdate';
import { Restauranttableupdate } from './components/restauranttablecomponent/restauranttableupdate/restauranttableupdate';
import { Reporte01 } from './components/reporte01/reporte01';
import { Reporte02 } from './components/reporte02/reporte02';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'reporte01',
    component: Reporte01
  },
  {
    path: 'reporte02',
    component: Reporte02
  },
  {
    path: 'homes',
    component: Homecomponent
  },
  {
    path: 'homes',
    component: Homecomponent,
    canActivate: [seguridadGuard]
  },

  // --- CATEGORÍAS ---
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [seguridadGuard]
  },
  {
    path: 'categories/new',
    component: CategoryInsertComponent,
    canActivate: [seguridadGuard]
  },
  {
    path: 'categories/edit/:id',
    component: Categoryupdate,
    canActivate: [seguridadGuard]
  },

  // --- USUARIOS ---
  {
    path: 'usuario',
    component: Usuariocomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'lista', component: UsuarioList },
      { path: 'news',  component: UsuarioInsert },
      { path: 'edit/:id', component: Usuarioupdate }
    ]
  },

  // --- RESTAURANTES ---
  {
    path: 'restaurant',
    component: Restaurantcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'news', component: Restaurantinsert },
      { path: 'list', component: Restaurantlist },
      { path: 'edit/:id', component: Restaurantupdate }
    ]
  },

  // --- HORARIOS ---
  {
    path: 'schedules',
    component: Schedulecomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'news', component: Scheduleinsert },
      { path: 'list', component: Schedulelist },
    ]
  },

  // --- MESAS ---
  {
    path: 'tables',
    component: Restauranttablecomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'news', component: Restauranttableinsert },
      { path: 'list', component: RestaurantTablelist },
    ]
  },

  // --- RESEÑAS ---
  {
    path: 'reviews',
    component: Reviewcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'list', component: ReviewListar },
      { path: 'news', component: ReviewInsertar },
      { path: 'edit/:id', component: ReviewUpdate }
    ]
  },

  // --- RESERVAS ---
  {
    path: 'Reservas',
    component: Reservationcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'list', component: ReservationList },
      { path: 'news', component: ReservationInsert },
      { path: 'edit/:id', component: ReservationUpdate }
    ]
  },

  // --- FAVORITOS ---
  {
    path: 'favoritos',
    component: Favoritecomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'list', component: FavoriteListar },
      { path: 'news', component: FavoriteInsertar },
    ]
  },

  // SIEMPRE AL FINAL
  {
    path: '**',
    redirectTo: 'homes'
  }
];