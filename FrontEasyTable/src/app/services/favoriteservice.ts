import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Favorite } from '../models/Favorite';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Favoriteservice {
  private url = `${base_url}/favorite`;

  constructor(private http: HttpClient) {}

  /** GET /favorite/listar — ADMIN, OWNER, USER */
  list() {
    return this.http.get<Favorite[]>(`${this.url}/listar`);
  }

  /** GET /favorite/usuario/{idUsuario} — ADMIN, USER */
  listByUser(idUsuario: number) {
    return this.http.get<Favorite[]>(`${this.url}/usuario/${idUsuario}`);
  }

  /** POST /favorite/register — ADMIN, USER */
  insert(fav: Favorite) {
    return this.http.post(`${this.url}/register`, fav, { responseType: 'text' });
  }

  /** DELETE /favorite/delete/{id} — ADMIN */
  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' });
  }

  /** GET /favorite/ranking — ADMIN, OWNER, USER */
  getRanking() {
    return this.http.get<any[]>(`${this.url}/ranking`);
  }
}
