import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs'; // Importamos Observable

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/api-usuarios`;

  constructor(private http: HttpClient) {}

  // Listar usuarios
  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/lista`);
  }

  // ➕ NUEVO: Método para eliminar un usuario por ID
  deleteUsuario(id: number): Observable<void> {
    // Esto enviará una petición DELETE a: tu_base_url/api-usuarios/eliminar/ID
    return this.http.delete<void>(`${this.url}/eliminar/${id}`);
  }
}