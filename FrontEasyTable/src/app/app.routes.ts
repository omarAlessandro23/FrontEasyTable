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
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full'
  },

  {
    path: 'homes',
    component: Homecomponent
  },

  {
    path: 'categories',
    component: CategoryListComponent
  },

  {
    path: 'categories/new',
    component: CategoryInsertComponent
  },

  {
    path: 'categories/new',
    component: CategoryInsertComponent
  },

  {
    path: 'categories/edit/:id',
    component: Categoryupdate
  },

  {
    path: 'usuario',
    component: Usuariocomponent,
    children: [
      {
        path: 'lista', component: UsuarioList
      },
      {
        path: 'news',  component: UsuarioInsert
      }
    ]
  },
 
  {
  path:'restaurant',
        component:Restaurantcomponent,
        children:[
            { path: 'news', component: Restaurantinsert },
            { path: 'list', component: Restaurantlist },
      ]
  },
  {
  path:'schedules',
        component:Schedulecomponent,
        children:[
            { path: 'news', component: Scheduleinsert },
            { path: 'list', component: Schedulelist },
      ]
  },
   {
  path:'tables',
        component:Restauranttablecomponent,
        children:[
            { path: 'news', component: Restauranttableinsert },
            { path: 'list', component: RestaurantTablelist },
      ]
  },
  // SIEMPRE AL FINAL
  {
    path: '**',
    redirectTo: 'homes'
  }
];