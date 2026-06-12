import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/Usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/api-usuarios`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}/lista`);
  }
}
