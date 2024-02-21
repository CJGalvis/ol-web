import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private urlUsers = '/users';
  private urlNotifications = '/notification';
  private urlCards = '/dashboard_cards';
  private urlServerDetails = '/cpu_report';
  private urlReportCommits = '/report_commits';
  private urlTodos = '/todos';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${environment.URL_API}${this.urlUsers}`);
  }

  getNotifications() {
    return this.http.get(`${environment.URL_API}${this.urlNotifications}`);
  }

  getCards() {
    return this.http.get(`${environment.URL_API}${this.urlCards}`);
  }

  getServerDetails() {
    return this.http.get(`${environment.URL_API}${this.urlServerDetails}`);
  }

  getReportCommits() {
    return this.http.get(`${environment.URL_API}${this.urlReportCommits}`);
  }

  getTodos() {
    return this.http.get(`${environment.URL_API}${this.urlTodos}`);
  }

  getWeatherMap(lat: number, lon: number) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${environment.API_KEY_WEATHER}`
    );
  }
}
