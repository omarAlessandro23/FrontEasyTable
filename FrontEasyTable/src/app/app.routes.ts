import { Routes } from '@angular/router';
import { CategoryInsertComponent } from './components/category/categoryinsert/categoryinsert';
import { CategoryListComponent } from './components/category/categorylist/categorylist';

export const routes: Routes = [
    // Ruta por defecto: redirige automáticamente a la lista de categorías
    { path: '', redirectTo: 'categories', pathMatch: 'full' },

    // Ruta para listar las categorías
    { path: 'categories', component: CategoryListComponent },

    // Ruta para insertar una nueva categoría
    { path: 'categories/new', component: CategoryInsertComponent },

    // Ruta comodín (opcional): Maneja cualquier dirección que no exista redirigiendo al listado
    { path: '**', redirectTo: 'categories' }
];