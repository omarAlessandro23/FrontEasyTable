import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/Reservation';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Reservationservice {
  private url = `${base_url}/Reservacion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Reservation[]>(`${this.url}/listar`);
  }

  listId(id: number) {
    return this.http.get<Reservation>(`${this.url}/${id}`);
  }

  insert(res: Reservation) {
    return this.http.post(`${this.url}/registrar`, res, { responseType: 'text' });
  }

  update(id: number, res: Reservation) {
    return this.http.put(`${this.url}/actualizar/${id}`, res, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`, { responseType: 'text' });
  }

  buscarPorEstado(status: string) {
    return this.http.get<Reservation[]>(`${this.url}/buscar-estado/${status}`);
  }
}
