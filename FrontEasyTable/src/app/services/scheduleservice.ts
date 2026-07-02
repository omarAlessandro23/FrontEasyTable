import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Schedule } from '../models/Schedule'; // Asegúrate de que la ruta a tu modelo sea correcta

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Scheduleservice {
  private url = `${base_url}/schedules`; // Ajusta el endpoint según tu @Table(name="schedules") o Controller de Java

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Schedule[]>(`${this.url}/listar`);
  }

  listId(id: number) {
    return this.http.get<Schedule>(`${this.url}/${id}`);
  }

  insert(s: Schedule) {
    return this.http.post(`${this.url}/registrar`, s);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }

  update(id: number, schedule: Schedule) {
    return this.http.put<Schedule>(`${this.url}/${id}`, schedule);
  }
}