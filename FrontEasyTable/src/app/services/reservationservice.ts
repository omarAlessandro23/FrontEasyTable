import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/Reservation';
import { environment } from '../../environments/environment.development';

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

  insert(reservation: Reservation) {
    return this.http.post(`${this.url}/registrar`, reservation, { responseType: 'text' });
  }

  update(id: number, reservation: Reservation) {
    return this.http.put(`${this.url}/actualizar/${id}`, reservation, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`, { responseType: 'text' });
  }

  buscarPorEstado(status: string) {
    return this.http.get<Reservation[]>(`${this.url}/buscar-estado/${status}`);
  }
}