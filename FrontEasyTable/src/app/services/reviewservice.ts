import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/Review';
import { environment } from '../../environments/environment.development';

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

  insert(review: Review) {
    return this.http.post(`${this.url}/registrar`, review, { responseType: 'text' });
  }

  update(id: number, review: Review) {
    return this.http.put(`${this.url}/actualizar/${id}`, review, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`, { responseType: 'text' });
  }

  findByRestaurantId(restaurantId: number) {
    return this.http.get<Review[]>(`${this.url}/buscar-restaurante/${restaurantId}`);
  }

  findByUserId(userId: number) {
    return this.http.get<Review[]>(`${this.url}/buscar-usuario/${userId}`);
  }
}