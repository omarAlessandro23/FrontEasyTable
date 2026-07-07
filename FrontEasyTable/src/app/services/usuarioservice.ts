import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/Usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/usuario`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }
  listId(id: number) {
      return this.http.get<Usuario>(`${this.url}/${id}`);
    }
  insert(c: Usuario) {
  return this.http.post(`${this.url}/registrar`, c, { 
    responseType: 'text' 
  });
}
  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }
  update(id: number, Usuario: Usuario) {
      return this.http.put<Usuario>(`${this.url}/${id}`, Usuario);
    }
}
