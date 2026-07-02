import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RestaurantTable } from '../models/Restaurantable'; // Asegúrate de que la ruta a tu modelo sea correcta

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RestaurantTableservice {
  private url = `${base_url}/restaurant-tables`; 

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RestaurantTable[]>(`${this.url}/listar`);
  }

  listId(id: number) {
    return this.http.get<RestaurantTable>(`${this.url}/${id}`);
  }

  insert(rt: RestaurantTable) {
    return this.http.post(`${this.url}/insertar`, rt);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }

  update(id: number, table: RestaurantTable) {
    return this.http.put<RestaurantTable>(`${this.url}/${id}`, table);
  }
}