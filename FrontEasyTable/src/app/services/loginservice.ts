import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtRequestDTO } from '../models/JwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class Loginservice {

  private base_url = environment.base;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(request: JwtRequestDTO) {
    return this.http.post(`${this.base_url}/login`, request);
  }

  verificar(): boolean {

    if (!this.isBrowser()) {
      return false;
    }

    const token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole(): string | null {

    if (!this.isBrowser()) {
      return null;
    }

    const token = sessionStorage.getItem('token');

    if (!token) {
      return null;
    }
    //npm install @auth0/angular-jwt
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    return decodedToken.roles;
  }
}
