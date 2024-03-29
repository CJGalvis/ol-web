import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private urlProjects = '/projects';

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get(`${environment.URL_API}${this.urlProjects}`);
  }
}
