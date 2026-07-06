import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewQuery1DTO } from '../models/ReviewQuery1DTO';
import { environment } from '../../environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReviewReportService {
  // Cambia esto por la URL real de tu backend
  private url = `${base_url}/reviews`;

  constructor(private http: HttpClient) {}

  getRestaurantAverages(): Observable<ReviewQuery1DTO[]> {
    return this.http.get<ReviewQuery1DTO[]>(this.url + '/rating-promedio');
  }
}