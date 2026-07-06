import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private url = `${base_url}/favorite`; // O la ruta base de tu controlador de favoritos

  constructor(private http: HttpClient) {}

  // Agrega este método para obtener el ranking
  getRanking(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/ranking`);
  }
}