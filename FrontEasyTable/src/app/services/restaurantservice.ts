import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Restaurant } from '../models/Restaurant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte2 } from '../models/reporte2';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Restaurantservice {
  private url = `${base_url}/restaurants`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Restaurant[]>(`${this.url}/listar`);
  }
  listId(id: number) {
    return this.http.get<Restaurant>(`${this.url}/${id}`);
  }
  insert(c: Restaurant) {
    return this.http.post(`${this.url}/registrar`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }
  update(id: number, Restaurant: Restaurant) {
    return this.http.put<Restaurant>(`${this.url}/${id}`, Restaurant);
  }
  getTopRated(rating: number): Observable<Restaurant[]> {
    const params = new HttpParams().set('rating', rating.toString());
    return this.http.get<Restaurant[]>(`${this.url}/mejoresCalificados`, { params });
  }
  getNearbyRestaurants(lat: number, lng: number, dist: number): Observable<Restaurant[]> {
  const params = new HttpParams()
    .set('lat', lat.toString())
    .set('lng', lng.toString())
    .set('dist', dist.toString());
    
  return this.http.get<Restaurant[]>(`${this.url}/cercanos`, { params });}
}
