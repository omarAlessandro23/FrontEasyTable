import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Category } from '../models/category';
import { Reporte1 } from '../models/reporte1';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = `${base_url}/categoria`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Category[]>(`${this.url}/listar`);
  }

  listId(id: number) {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  insert(category: Category) {
    return this.http.post<Category>(`${this.url}/registrar`, category);
  }

  update(id: number, category: Category) {
    return this.http.put<Category>(`${this.url}/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`);
  }
  
  getCategoryQuery():Observable<Reporte1[]>{
    return this.http.get<Reporte1[]>(`${this.url}/categorias-sin-restaurantes`);
  }
}