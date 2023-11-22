import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDbService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  private apiUrl = 'http://192.168.100.59:8000/api/'

  constructor(private http: HttpClient) { }

  registroUsuario(username: string, email: string, password: string) {
    const data = {
      username: username,
      email: email,
      password: password
    }
    return this.http.post(`${this.apiUrl}registro`, data, this.httpOptions);
  }

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.apiUrl}ingreso`, data, this.httpOptions).pipe(
      map((response: any) => {
        if (response && typeof response === 'object') {
          const keys = Object.keys(response);
          if (keys.length > 0) {
            return response[keys[0]]
          } else {
            return null
          }
        }
      })
    );
  }
}
