import { Routes } from '@angular/router';
import { CategoryInsertComponent } from './components/category/categoryinsert/categoryinsert';
import { CategoryListComponent } from './components/category/categorylist/categorylist';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { UsuarioInsert } from './components/usuariocomponent/usuario-insert/usuario-insert';
import { Categoryupdate } from './components/category/categoryupdate/categoryupdate';

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
        path: 'lista',
        component: UsuarioList
      },
      {
        path: 'news',
        component: UsuarioInsert
      }
    ]
  },

  // SIEMPRE AL FINAL
  {
    path: '**',
    redirectTo: 'homes'
  }
];