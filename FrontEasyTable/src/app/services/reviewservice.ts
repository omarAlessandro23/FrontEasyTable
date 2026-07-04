import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/Review';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Reviewservice {
  private url = `${base_url}/reviews`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Review[]>(`${this.url}/listar`);
  }

  listId(id: number) {
    return this.http.get<Review>(`${this.url}/${id}`);
  }

  insert(rev: Review) {
    return this.http.post(`${this.url}/registrar`, rev, { responseType: 'text' });
  }

  update(id: number, rev: Review) {
    return this.http.put(`${this.url}/actualizar/${id}`, rev, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`, { responseType: 'text' });
  }

  searchUserId(uid: number) {
    return this.http.get<Review[]>(`${this.url}/buscar-usuario/${uid}`);
  }

  searchRestId(rid: number) {
    return this.http.get<Review[]>(`${this.url}/buscar-restaurante/${rid}`);
  }
}
