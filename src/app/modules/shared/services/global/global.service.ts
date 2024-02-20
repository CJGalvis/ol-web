import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_CONFIG } from 'src/app/core/const';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public loadingBehavior = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  /**
   * Método para obtener el archivo de configuraciones y textos del proyecto
   * @returns Json config ubicado en los assets del proyecto
   */
  getConfigurationJson(): Observable<any> {
    return this.http.get(URL_CONFIG);
  }

  /**
   * Método para guardar datos en el local storage
   */
  setDataStorage(key: string, data: any) {
    localStorage.setItem(key, btoa(JSON.stringify(data)));
  }

  /**
   * Método para extraer datos del local storage
   */
  getDataStorage(key: string) {
    return JSON.parse(atob(localStorage.getItem(key)!));
  }

  /**
   * Método para limiar variable del local storage
   */
  clear(key: string) {
    localStorage.removeItem(key);
  }
}
