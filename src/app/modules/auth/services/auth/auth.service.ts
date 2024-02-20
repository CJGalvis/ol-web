import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = '/login';

  constructor(private http: HttpClient) {}

  login(user: string, pass: string) {
    return this.http.get(
      `${environment.URL_API}${this.urlLogin}?user=${user}&password=${pass}`
    );
  }
}
